
export const runtime = "nodejs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  return res.json({
    ok: true,
    message: "API funcionando",
    recommendation: "AZUL",
    confidence: 75
  });
}
