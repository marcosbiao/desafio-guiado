# Desafios Guiados

Aplicacao web educacional para praticar desafios de programacao em C com acompanhamento de progresso, verificacao de respostas e feedback sobre as tentativas.

Este projeto faz parte do meu trabalho de doutorado e ainda esta em execucao. Por isso, sua estrutura, funcionalidades e criterios de avaliacao podem ser ajustados ou modificados ao longo do processo de pesquisa e desenvolvimento.

## Requisitos

- Node.js 20.19+ recomendado
- npm

## Configuracao

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Crie ou atualize o arquivo `.env.local` com as variaveis necessarias para executar o servidor. Exemplo:

   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

## Executando Localmente

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, acesse:

```text
http://localhost:3000/desafio-guiado/
```

## Scripts Disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento do Vite.
- `npm run build`: gera a versao de producao.
- `npm run start`: executa a versao gerada em `dist/`.
- `npm run lint`: valida os tipos com TypeScript.
- `npm test`: executa os testes em modo interativo.
- `npm run test:run`: executa os testes uma unica vez.
- `npm run test:coverage`: gera relatorio de cobertura.

## Estrutura Geral

- `src/`: codigo-fonte da aplicacao.
- `server.ts`: servidor usado para rotas e integracoes.
- `firestore.rules`: regras de seguranca do Firestore.
- `TESTING.md`: detalhes sobre a estrategia de testes.
