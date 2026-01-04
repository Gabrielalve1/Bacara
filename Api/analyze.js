
export const runtime = "nodejs";

import { analyzeImage } from "../Lib/vision.js";
import { state } from "../Lib/state.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  let buffer = Buffer.from([]);

  for await (const chunk of req) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  const vision = await analyzeImage(buffer);

  state.history.push(vision.dominant);

  const probabilities = {
    AZUL: 33,
    VERMELHO: 33,
    EMPATE: 34
  };

  probabilities[vision.dominant] += vision.strength / 2;

  return res.json({
    result: {
      recommendation: vision.dominant,
      confidence: vision.confidence,
      probabilities
    },
    state
  });
}
