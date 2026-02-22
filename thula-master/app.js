const suits = ["?", "?", "?", "?"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const rankValue = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const state = {
  deck: [],
  playerScore: 0,
  cpuScore: 0,
  target: 5,
  gameOver: false,
};

const ui = {
  playerCard: document.getElementById("playerCard"),
  cpuCard: document.getElementById("cpuCard"),
  playerLabel: document.getElementById("playerLabel"),
  cpuLabel: document.getElementById("cpuLabel"),
  playerScore: document.getElementById("playerScore"),
  cpuScore: document.getElementById("cpuScore"),
  deckCount: document.getElementById("deckCount"),
  roundMessage: document.getElementById("roundMessage"),
  drawBtn: document.getElementById("drawBtn"),
  newGameBtn: document.getElementById("newGameBtn"),
};

function buildDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit, value: rankValue[rank] });
    }
  }
  return deck;
}

function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function drawCard() {
  return state.deck.pop();
}

function setCard(node, card) {
  node.textContent = `${card.rank}${card.suit}`;
  const isRed = card.suit === "?" || card.suit === "?";
  node.style.color = isRed ? "#bf1d1d" : "#1b2b3d";
}

function updateScoreboard() {
  ui.playerScore.textContent = String(state.playerScore);
  ui.cpuScore.textContent = String(state.cpuScore);
  ui.deckCount.textContent = String(state.deck.length);
}

function endGame(message) {
  state.gameOver = true;
  ui.roundMessage.textContent = message;
  ui.drawBtn.disabled = true;
}

function checkWin() {
  if (state.playerScore >= state.target) {
    endGame("You are the Thula Master. You won!");
    return true;
  }
  if (state.cpuScore >= state.target) {
    endGame("Computer wins this match. Try again.");
    return true;
  }
  if (state.deck.length < 2) {
    if (state.playerScore > state.cpuScore) endGame("Deck over. You win by points.");
    else if (state.cpuScore > state.playerScore) endGame("Deck over. Computer wins by points.");
    else endGame("Deck over. Match tied.");
    return true;
  }
  return false;
}

function playRound() {
  if (state.gameOver) return;

  const playerCard = drawCard();
  const cpuCard = drawCard();

  setCard(ui.playerCard, playerCard);
  setCard(ui.cpuCard, cpuCard);
  ui.playerLabel.textContent = `${playerCard.rank} of ${playerCard.suit}`;
  ui.cpuLabel.textContent = `${cpuCard.rank} of ${cpuCard.suit}`;

  if (playerCard.value > cpuCard.value) {
    state.playerScore += 1;
    ui.roundMessage.textContent = "Round result: You win this round.";
  } else if (cpuCard.value > playerCard.value) {
    state.cpuScore += 1;
    ui.roundMessage.textContent = "Round result: Computer wins this round.";
  } else {
    ui.roundMessage.textContent = "Round result: Tie.";
  }

  updateScoreboard();
  checkWin();
}

function resetGame() {
  state.deck = buildDeck();
  shuffle(state.deck);
  state.playerScore = 0;
  state.cpuScore = 0;
  state.gameOver = false;

  ui.playerCard.textContent = "?";
  ui.cpuCard.textContent = "?";
  ui.playerCard.style.color = "#1b2b3d";
  ui.cpuCard.style.color = "#1b2b3d";
  ui.playerLabel.textContent = "Draw to start";
  ui.cpuLabel.textContent = "Waiting";
  ui.roundMessage.textContent = "Click \"Draw Cards\" to play.";
  ui.drawBtn.disabled = false;

  updateScoreboard();
}

ui.drawBtn.addEventListener("click", playRound);
ui.newGameBtn.addEventListener("click", resetGame);

resetGame();