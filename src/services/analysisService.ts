import { GoogleGenAI, Type } from "@google/genai";
import { Category, HeuristicResult, Challenge } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Analisa o código do aluno usando a API do Gemini para fornecer feedback pedagógico.
 */
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
