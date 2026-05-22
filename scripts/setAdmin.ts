import admin from 'firebase-admin';
import { readFileSync } from 'fs';

/**
 * Script utilitário para definir privilégios de administrador via Custom Claims.
 * 
 * USO:
 * 1. Baixe o arquivo JSON de conta de serviço do console do Firebase.
 * 2. Salve como 'service-account.json' na raiz do projeto.
 * 3. Execute: npx tsx scripts/setAdmin.ts <USER_UID>
 */

const uid = process.argv[2];

if (!uid) {
  console.error("Por favor, forneça o UID do usuário: npx tsx scripts/setAdmin.ts <UID>");
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  async function setAdminClaim(userUid: string) {
    try {
      await admin.auth().setCustomUserClaims(userUid, { admin: true });
      console.log(`[SUCESSO] Privilégios de administrador concedidos ao usuário: ${userUid}`);
      
      // Verificar se foi aplicado
      const user = await admin.auth().getUser(userUid);
      console.log("Claims atuais:", user.customClaims);
    } catch (error) {
      console.error("[ERRO] Falha ao definir claims:", error);
    } finally {
      process.exit();
    }
  }

  setAdminClaim(uid);
} catch (error) {
  console.error("[ERRO] Certifique-se de que 'service-account.json' existe na raiz.");
  process.exit(1);
}
