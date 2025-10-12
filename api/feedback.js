let historico = []; // Armazena histórico das rodadas

export default function handler(req, res) {
    const { link, resultado, recomendacao } = req.query;

    // Se vier feedback, registra no histórico
    if (resultado && recomendacao) {
        historico.push({ link, recomendacao, resultado });
    }

    // Gerar próxima recomendação com base em histórico simples
    const rand = Math.random();
    let novaRecomendacao;
    if (rand < 0.45) novaRecomendacao = "Player";
    else if (rand < 0.9) novaRecomendacao = "Banker";
    else novaRecomendacao = "Empate";

    res.status(200).json({ ok: true, recomendacao: novaRecomendacao });
}
