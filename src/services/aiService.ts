import { GoogleGenAI, Type } from "@google/genai";
import { Category, HeuristicResult, Challenge } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeCodeWithGemini(
  code: string,
  challenge: Challenge
): Promise<HeuristicResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Código do Aluno:\n${code}\n\nContexto do Desafio:\n${JSON.stringify({
              title: challenge.title,
              problem: challenge.problem,
              orientation: challenge.orientation,
              template: challenge.templateCode
            })}`
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description: "A categoria da solução: 'tentativa inicial', 'parcialmente correta', 'quase completa' ou 'solução adequada'."
          },
          feedback: {
            type: Type.OBJECT,
            properties: {
              good: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Lista de pontos positivos no código."
              },
              review: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Lista de pontos que precisam de revisão ou correção."
              },
              nextStep: {
                type: Type.STRING,
                description: "Uma orientação pedagógica curta sobre o que o aluno deve fazer a seguir."
              }
            },
            required: ["good", "review", "nextStep"]
          },
          difficulty: {
            type: Type.STRING,
            description: "Uma breve hipótese sobre qual conceito de programação o aluno está tendo dificuldade."
          }
        },
        required: ["category", "feedback", "difficulty"]
      },
      systemInstruction: `Você é um tutor de programação em C altamente pedagógico. 
      Seu objetivo é ajudar alunos iniciantes a resolver desafios de lógica sem dar a resposta pronta.
      
      Analise o código enviado pelo aluno para o desafio: "${challenge.title}".
      Problema: "${challenge.problem}"
      
      DIRETRIZES:
      1. Seja encorajador.
      2. Identifique erros de sintaxe e lógica.
      3. Se o aluno estiver no caminho certo, valide os acertos.
      4. Se houver erros, explique o CONCEITO por trás do erro em vez de apenas dizer "está errado".
      5. NUNCA forneça o código corrigido completo.
      6. Categorize a solução conforme o progresso do aluno.
      
      FORMATO DE RESPOSTA: JSON estrito conforme o schema fornecido.`
    }
  });

  try {
    const result = JSON.parse(response.text || "{}");
    
    return {
      category: result.category as Category,
      feedback: result.feedback,
      difficulty: result.difficulty
    };
  } catch (error) {
    console.error("Erro na análise do Gemini:", error);
    // Fallback para a análise heurística local se a IA falhar
    return challenge.analyze(code);
  }
}

export async function simulateExecution(
  code: string,
  challenge: Challenge
): Promise<{ output: string; isError: boolean }> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Código C do Aluno:\n${code}\n\nDesafio: ${challenge.title}\nProblema: ${challenge.problem}\n\nPor favor, atue como um compilador e runtime de C. 
            1. Verifique se há erros de sintaxe. Se houver, retorne apenas as mensagens de erro do compilador (estilo gcc).
            2. Se não houver erros de sintaxe, simule a execução do programa.
            3. Se o programa usar 'scanf', utilize valores de teste que façam sentido para o desafio (ex: se o desafio é testar se um número é positivo, use um número como 10 ou -5).
            4. Retorne o que apareceria no terminal (STDOUT), incluindo os prompts do printf.`
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          output: {
            type: Type.STRING,
            description: "O output completo do terminal ou as mensagens de erro do compilador."
          },
          isError: {
            type: Type.BOOLEAN,
            description: "Verdadeiro se houver erro de compilação, falso se o código rodou com sucesso."
          }
        },
        required: ["output", "isError"]
      },
      systemInstruction: "Você é um simulador de terminal C (GCC Runtime). Sua única tarefa é compilar e rodar o código fornecido, retornando o output exato do terminal em formato JSON."
    }
  });

  try {
    const result = JSON.parse(response.text || '{"output": "Erro na simulação", "isError": true}');
    return result;
  } catch (e) {
    return { output: "Erro interno ao simular execução.", isError: true };
  }
}
