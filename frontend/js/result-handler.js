// NSO Result Handler

function createResult(testName, student, score, total){
 let percentage = total > 0 ? ((score/total)*100).toFixed(2) : 0;
 return {
  studentName: student.name,
  email: student.email,
  testName: testName,
  score: score,
  percentage: percentage,
  date: new Date().toLocaleString()
 };
}

function showResult(result){
 let box=document.getElementById('result');
 if(box){
  box.innerHTML = `Test: ${result.testName}<br>Score: ${result.score}<br>Percentage: ${result.percentage}%`;
 }
}
