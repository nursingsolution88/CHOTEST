// NSO Email Result Module

async function sendResultEmail(result){
 const payload={
  name: result.studentName,
  email: result.email,
  testName: result.testName,
  score: result.score,
  percentage: result.percentage
 };

 // Connect with Google Apps Script email API
 console.log('Email Result Payload', payload);
}

function performanceSummary(percentage){
 if(percentage>=80) return 'Excellent Performance';
 if(percentage>=60) return 'Good Performance';
 return 'Need More Practice';
}
