import fetch from 'node-fetch';

let historico = [];

export default async function handler(req, res) {
  const { link, resultado, recomendacao } = req.query;

  // Registra feedback
  if (resultado && recomendacao) {
    historico.push({ link, recomendacao, resultado });
  }

  // Aqui você adiciona lógica para capturar o gráfico real do site
  // Por enquanto, simula captura e aplica estratégias:
  let novaRecomendacao = "Player";

  if (historico.length > 0) {
    let ultima = historico[historico.length - 1];
    if (ultima.resultado === "erro") {
      novaRecomendacao = ultima.recomendacao === "Player" ? "Banker" : "Player";
    } else if (ultima.resultado === "empate") {
      novaRecomendacao = "Empate";
    } else {
      novaRecomendacao = ultima.recomendacao;
    }
  }

  res.status(200).json({ ok: true, recomendacao: novaRecomendacao });
}
