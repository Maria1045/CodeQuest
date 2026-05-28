const form = document.getElementById("game-form");
const input = document.getElementById("user-input");
const feedback = document.getElementById("feedback");
const questionEl = document.getElementById("question");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");
const languageSelect = document.getElementById("language-select");
const submitButton = document.getElementById("submit-btn");

let language = "en";
let current = 0;
let score = 0;
let timer;
const timeLimit = 30;
let timeLeft = timeLimit;

const questions = {
  en: [
    { question: "What punctuation ends a question?", answer: "?" },
    { question: "What punctuation ends a sentence?", answer: "." },
    { question: "What punctuation shows excitement?", answer: "!" },
    { question: "What punctuation is used in a contraction like can't?", answer: "'" },
    { question: "What punctuation separates items in a list?", answer: "," },
    { question: "What punctuation is used for dialogue?", answer: "\"" },
    { question: "What punctuation is used to join two independent clauses?", answer: ";" },
    { question: "What punctuation introduces a list?", answer: ":" },
    { question: "What punctuation shows possession?", answer: "'" },
    { question: "What punctuation ends a command?", answer: "." },
    { question: "What punctuation is used in parentheses?", answer: ")" },
    { question: "What punctuation marks a pause or omission?", answer: "..." },
    { question: "What punctuation is used in web addresses?", answer: "/" },
    { question: "What punctuation connects words like well-known?", answer: "-" },
    { question: "What punctuation is used in email addresses?", answer: "@" }
  ],
  es: [
    { question: "¿Qué signo de puntuación termina una pregunta?", answer: "?" },
    { question: "¿Qué signo de puntuación termina una oración?", answer: "." },
    { question: "¿Qué signo muestra emoción?", answer: "!" },
    { question: "¿Qué signo se usa en contracciones como 'no puedo' (can't)?", answer: "'" },
    { question: "¿Qué signo separa elementos en una lista?", answer: "," },
    { question: "¿Qué signo se usa para el diálogo?", answer: "\"" },
    { question: "¿Qué signo une dos oraciones independientes?", answer: ";" },
    { question: "¿Qué signo introduce una lista?", answer: ":" },
    { question: "¿Qué signo muestra posesión?", answer: "'" },
    { question: "¿Qué signo termina un mandato o instrucción?", answer: "." },
    { question: "¿Qué signo se usa entre paréntesis?", answer: ")" },
    { question: "¿Qué signo indica una pausa u omisión?", answer: "..." },
    { question: "¿Qué signo se usa en direcciones web?", answer: "/" },
    { question: "¿Qué signo une palabras como 'bien-estar'?", answer: "-" },
    { question: "¿Qué signo se usa en correos electrónicos?", answer: "@" }
  ]
};

function updateScore() {
  scoreDisplay.innerText = `Puntaje / Score: ${score}`;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = timeLimit;
  timerDisplay.innerText = `⏱️ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      score -= 5;
      feedback.innerText = language === "es" ? "⏰ ¡Tiempo agotado! −5 puntos." : "⏰ Time's up! −5 points.";
      updateScore();
      nextLevel();
    }
  }, 1000);
}

function mostrarPregunta() {
  const set = questions[language];
  if (current < set.length) {
    questionEl.innerText = `Nivel / Level ${current + 1}: ${set[current].question}`;
    input.value = "";
    feedback.innerText = "";
    input.focus();
    startTimer();
  } else {
    terminarJuego();
  }
}

function terminarJuego() {
  clearInterval(timer);
  questionEl.innerText = (language === "es")
    ? `🎉 ¡Juego terminado! Puntaje final: ${score}`
    : `🎉 Game Over! Final Score: ${score}`;
  form.style.display = "none";
  timerDisplay.style.display = "none";
}

function nextLevel() {
  current++;
  setTimeout(() => {
    mostrarPregunta();
  }, 1000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterval(timer);
  const userAnswer = input.value.trim();
  const set = questions[language];

  if (userAnswer === set[current].answer) {
    feedback.innerText = language === "es" ? "✅ ¡Correcto!" : "✅ Correct!";
    score += 10;
  } else {
    feedback.innerText = language === "es" ? "❌ Incorrecto −5 puntos." : "❌ Incorrect −5 points.";
    score -= 5;
  }

  updateScore();
  nextLevel();
});

startButton.addEventListener("click", () => {
  language = languageSelect.value;
  startScreen.style.display = "none";
  gameScreen.style.display = "block";

  submitButton.textContent = (language === "es") ? "Enviar" : "Submit";
  input.placeholder = (language === "es") ? "Escribe tu respuesta" : "Type your answer";

  score = 0;
  current = 0;
  updateScore();
  mostrarPregunta();
});
