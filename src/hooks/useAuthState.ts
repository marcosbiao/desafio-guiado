import { useState, useEffect } from 'react';
import { UserProfile, AuthState } from '../types';
import { authService } from '../services/authService';
import { userProfileService } from '../services/userProfileService';

/**
 * Hook para gerenciar o estado de autenticação e perfil do usuário.
 */
export function useAuthState(): AuthState {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const isAdmin = await authService.checkIsAdmin(firebaseUser);
          const userData = await userProfileService.ensureUserProfile(firebaseUser, isAdmin);
          setUser(userData);
          setError(null);
        } catch (error: any) {
          console.error("Erro ao carregar perfil do usuário:", error);
          setError("Falha ao carregar perfil.");
        }
      } else {
        setUser(null);
        setError(null);
      }
      setIsAuthReady(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await authService.loginWithGoogle();
    } catch (error: any) {
      console.error("Erro no login:", error);
      setError("Falha no login com Google.");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error: any) {
      console.error("Erro no logout:", error);
      setError("Falha ao sair.");
    }
  };

  return { user, isAuthReady, loading, error, login, logout };
}
