// NSO MCQ Engine (Upgraded)

let questions = [];
let current = 0;
let answers = {};

function loadQuestions(data) {
  questions = data || [];
  current = 0;
  answers = {};
  renderQuestion();
}

function renderQuestion() {
  let q = questions[current];
  if (!q) return;

  document.getElementById('question').innerHTML = q.question;

  const optionsBox = document.getElementById('options');
  if (optionsBox) {
    optionsBox.innerHTML = `
      <button onclick="selectAnswer('A')">A. ${q.A || ''}</button>
      <button onclick="selectAnswer('B')">B. ${q.B || ''}</button>
      <button onclick="selectAnswer('C')">C. ${q.C || ''}</button>
      <button onclick="selectAnswer('D')">D. ${q.D || ''}</button>
    `;
  }
}

function selectAnswer(value) {
  answers[current] = value;
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function submitTest() {
  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score++;
    }
  });

  return {
    score: score,
    total: questions.length,
    percentage: questions.length ? (score / questions.length) * 100 : 0
  };
}
