
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "URL não fornecida" });

  // Simulação: aqui você pode colocar a lógica real de análise do gráfico
  const prob = Math.random();
  let recomendacao = "";
  if (prob < 0.33) recomendacao = "Player";
  else if (prob < 0.66) recomendacao = "Banker";
  else recomendacao = "Empate";

  // Retornar recomendação
  res.status(200).json({ recomendacao });
}
