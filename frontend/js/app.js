// NSO App Integration Layer

let currentUser = null;

function startExamFlow(testData) {
  loadQuestions(testData);
  startTimer(function () {
    autoSubmit();
  });
}

function autoSubmit() {
  const result = submitTest();

  if (typeof saveLocalResult === 'function') {
    saveLocalResult(result);
  }

  if (typeof sendResultEmail === 'function') {
    sendResultEmail(result);
  }

  showResult(result);

  console.log('Test Completed:', result);
}

function manualSubmit() {
  autoSubmit();
}

function setCurrentUser(user) {
  currentUser = user;
}
