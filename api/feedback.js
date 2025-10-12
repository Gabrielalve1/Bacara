let historico = []; // Armazena histórico real

export default function handler(req, res) {
    const { link, resultado, recomendacao } = req.query;

    // Registra feedback no histórico
    if (resultado && recomendacao) {
        historico.push({ link, recomendacao, resultado });
    }

    // Estratégia adaptativa simples:
    let ultimaRodada = historico[historico.length - 1];
    let novaRecomendacao = "Player";

    if (ultimaRodada) {
        if (ultimaRodada.resultado === "erro") {
            // Se errou, aplica Gale adaptativo
            novaRecomendacao = ultimaRodada.recomendacao === "Player" ? "Banker" : "Player";
        } else if (ultimaRodada.resultado === "empate") {
            novaRecomendacao = "Empate";
        } else {
            // Mantém a tendência
            novaRecomendacao = ultimaRodada.recomendacao;
        }
    }

    res.status(200).json({ ok: true, recomendacao: novaRecomendacao });
}
