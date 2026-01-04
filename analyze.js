
import { NextResponse } from "next/server";
import { updateState, getState } from "@/lib/state";

/**
 * Simulação da leitura da imagem.
 * Na próxima etapa ligamos com IA de visão.
 */
function extractSequenceFromImage(): ("AZUL"|"VERMELHO"|"EMPATE")[] {
  // TEMPORÁRIO: exemplo
  return ["AZUL", "AZUL", "VERMELHO"];
}

function analyze(state: ReturnType<typeof getState>) {
  const total =
    state.counts.AZUL + state.counts.VERMELHO + state.counts.EMPATE || 1;

  const probs = {
    AZUL: Math.round((state.counts.AZUL / total) * 100),
    VERMELHO: Math.round((state.counts.VERMELHO / total) * 100),
    EMPATE: Math.round((state.counts.EMPATE / total) * 100),
  };

  // regra simples inicial (vamos evoluir)
  let recommendation: keyof typeof probs = "AZUL";
  let confidence = probs.AZUL;

  if (probs.VERMELHO > confidence) {
    recommendation = "VERMELHO";
    confidence = probs.VERMELHO;
  }
  if (probs.EMPATE > confidence) {
    recommendation = "EMPATE";
    confidence = probs.EMPATE;
  }

  return {
    recommendation,
    confidence,
    probabilities: probs,
  };
}

export async function POST(req: Request) {
  // 1) receber imagem (por enquanto ignoramos o conteúdo)
  // depois vamos processar de verdade
  await req.formData();

  // 2) extrair sequência da imagem
  const sequence = extractSequenceFromImage();

  // 3) atualizar estado
  const state = updateState(sequence);

  // 4) analisar
  const result = analyze(state);

  return NextResponse.json({
    status: "ok",
    sequenceAdded: sequence,
    state,
    result,
  });
}
