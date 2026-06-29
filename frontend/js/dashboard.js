// NSO Dashboard System

// Load available tests from backend
async function loadTests(testName) {
  const response = await fetchQuestions(testName);

  if (!response) {
    console.error('Failed to load tests');
    return;
  }

  renderTestList(response);
}

// Render test list in dashboard
function renderTestList(tests) {
  const container = document.getElementById('testList');
  if (!container) return;

  container.innerHTML = '';

  tests.forEach((test, index) => {
    const div = document.createElement('div');
    div.className = 'test-card';
    div.innerHTML = `
      <h3>${test.testName}</h3>
      <p>Subject: ${test.subject}</p>
      <button onclick="startExamFlowByIndex(${index})">Start Test</button>
    `;
    container.appendChild(div);
  });
}

// Start test by selected index
function startExamFlowByIndex(index) {
  const selectedTest = window.loadedTests?.[index];
  if (!selectedTest) return;

  startExamFlow(selectedTest);
}

// Initialize dashboard
async function initDashboard() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('userName').innerText = user.name;

  const tests = await fetchQuestions('ALL');
  window.loadedTests = tests || [];

  renderTestList(window.loadedTests);
}

window.onload = initDashboard;