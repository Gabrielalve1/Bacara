
type Color = "AZUL" | "VERMELHO" | "EMPATE";

interface GameState {
  history: Color[];
  counts: Record<Color, number>;
}

const globalState: GameState = {
  history: [],
  counts: {
    AZUL: 0,
    VERMELHO: 0,
    EMPATE: 0,
  },
};

export function updateState(newEvents: Color[]) {
  newEvents.forEach((c) => {
    globalState.history.push(c);
    globalState.counts[c]++;
  });

  // limita histórico (ex: últimos 60)
  if (globalState.history.length > 60) {
    globalState.history = globalState.history.slice(-60);
  }

  return globalState;
}

export function getState() {
  return globalState;
}
