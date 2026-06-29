// Nursing Solution Test Series
// Google Apps Script Backend

function doGet(){
  var sheet = SpreadsheetApp.getActive().getSheetByName('Question_Bank');
  var data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveResult(data){
  var sheet = SpreadsheetApp.getActive().getSheetByName('Results');
  sheet.appendRow([
    data.name,
    data.email,
    data.testName,
    data.score,
    data.correct,
    data.wrong,
    data.percentage,
    new Date()
  ]);
}

function sendEmailResult(email, result){
  MailApp.sendEmail({
    to: email,
    subject: 'NSO Test Result',
    body: result
  });
}
