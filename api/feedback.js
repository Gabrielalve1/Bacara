const historico = [];

module.exports = async (req, res) => {
  const { link, resultado, recomendacao } = req.query;

  // Salva feedback
  if (resultado && recomendacao) {
    historico.push({ link, recomendacao, resultado });
  }

  // Gera nova recomendação baseada no histórico
  let novaRecomendacao = "Player"; // padrão

  if (historico.length > 0) {
    const ultima = historico[historico.length - 1];

    if (ultima.resultado === "erro") {
      novaRecomendacao = ultima.recomendacao === "Player" ? "Banker" : "Player";
    } else if (ultima.resultado === "empate") {
      novaRecomendacao = "Empate";
    } else {
      novaRecomendacao = ultima.recomendacao;
    }
  }

  res.status(200).json({ ok: true, recomendacao: novaRecomendacao });
};
