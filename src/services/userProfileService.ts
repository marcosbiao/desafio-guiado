import { getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../types';
import { dataMappingService } from './dataMappingService';
import { firestoreService } from './firestoreService';
import { APP_CONSTANTS } from '../config/constants';

/**
 * Serviço para gerenciamento de perfis de usuário no Firestore.
 */
export const userProfileService = {
  
  /**
   * Garante que o perfil do usuário exista no Firestore.
   */
  async ensureUserProfile(firebaseUser: any, isAdmin: boolean): Promise<UserProfile> {
    const userRef = firestoreService.getUserProfileDoc(firebaseUser.uid);
    try {
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const newUser: any = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: isAdmin ? 'admin' : 'student',
          createdAt: serverTimestamp()
        };
        await setDoc(userRef, newUser);
        return dataMappingService.normalizeUserProfile({
          ...newUser,
          createdAt: new Date()
        });
      } else {
        const userData = userSnap.data();
        if (isAdmin && userData.role !== 'admin') {
          await setDoc(userRef, { role: 'admin' }, { merge: true });
          userData.role = 'admin';
        }
        return dataMappingService.normalizeUserProfile(userData);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${APP_CONSTANTS.COLLECTIONS.USER_PROFILES}/${firebaseUser.uid}`);
      throw error;
    }
  },

  /**
   * Recupera o perfil do usuário.
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = firestoreService.getUserProfileDoc(uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return dataMappingService.normalizeUserProfile(userSnap.data());
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${APP_CONSTANTS.COLLECTIONS.USER_PROFILES}/${uid}`);
      throw error;
    }
  }
};
