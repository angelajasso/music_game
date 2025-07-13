// Elementos del DOM
const startBtn = document.getElementById("start-btn");
const pianoKeys = document.querySelectorAll(".note");
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");

// Variables del juego
let sequence = [];
let userSequence = [];
let level = 1;
let score = 0;
let isPlayingSequence = false;

// Mapea notas con sonidos
const notes = {
  C: new Audio("sounds/do.mp3"),
  D: new Audio("sounds/re.mp3"),
  E: new Audio("sounds/mi.mp3"),
  F: new Audio("sounds/fa.mp3"),
  G: new Audio("sounds/sol.mp3"),
  A: new Audio("sounds/la.mp3"),
  B: new Audio("sounds/si.mp3"),
};

// Función para reproducir una nota
function playNote(note) {
  notes[note].currentTime = 0;
  notes[note].play();
  const key = document.querySelector(`[data-note="${note}"]`);
  key.classList.add("active");
  setTimeout(() => key.classList.remove("active"), 300);
}

// Genera una nota aleatoria y la agrega a la secuencia
function addNoteToSequence() {
  const noteKeys = Object.keys(notes);
  const randomNote = noteKeys[Math.floor(Math.random() * noteKeys.length)];
  sequence.push(randomNote);
}

// Reproduce la secuencia del juego
async function playSequence() {
  isPlayingSequence = true;
  for (let note of sequence) {
    playNote(note);
    await new Promise((res) => setTimeout(res, 700));
  }
  isPlayingSequence = false;
}

// Compara la secuencia del jugador con la correcta
function checkUserInput(note) {
  userSequence.push(note);
  const index = userSequence.length - 1;
  if (userSequence[index] !== sequence[index]) {
    alert("¡Fallaste! Intenta de nuevo.");
    resetGame();
    return;
  }
  if (userSequence.length === sequence.length) {
    score += 10;
    level++;
    updateDisplay();
    userSequence = [];
    addNoteToSequence();
    setTimeout(playSequence, 1000);
  }
}

// Reinicia el juego
function resetGame() {
  level = 1;
  score = 0;
  sequence = [];
  userSequence = [];
  updateDisplay();
}

// Actualiza los valores en pantalla
function updateDisplay() {
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
}

// Inicia el juego
function startGame() {
  resetGame();
  addNoteToSequence();
  playSequence();
}

// Eventos
startBtn.addEventListener("click", startGame);
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => {
    if (!isPlayingSequence) {
      const note = key.dataset.note;
      playNote(note);
      checkUserInput(note);
    }
  });
});
