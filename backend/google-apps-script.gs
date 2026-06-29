// NSO Google Apps Script Backend

const SHEET_USERS = "Users";
const SHEET_QUESTIONS = "Questions";
const SHEET_RESULTS = "Results";
const SHEET_TESTS = "Tests";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "NSO API Running",
    message: "Welcome to Nursing Solution Test Series API"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;

  if (action === "getQuestions") return getQuestions(data.testName);
  if (action === "saveResult") return saveResult(data);
  if (action === "registerUser") return registerUser(data);

  return jsonResponse({ error: "Invalid Action" });
}

function getSheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function getQuestions(testName) {
  const sheet = getSheet(SHEET_QUESTIONS);
  const rows = sheet.getDataRange().getValues();
  let result = [];

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === testName) {
      result.push({
        testName: rows[i][0],
        subject: rows[i][1],
        question: rows[i][2],
        A: rows[i][3],
        B: rows[i][4],
        C: rows[i][5],
        D: rows[i][6],
        answer: rows[i][7],
        explanation: rows[i][8]
      });
    }
  }

  return jsonResponse(result);
}

function saveResult(data) {
  const sheet = getSheet(SHEET_RESULTS);
  sheet.appendRow([
    data.name,
    data.email,
    data.testName,
    data.score,
    data.percentage,
    new Date()
  ]);

  return jsonResponse({ status: "saved" });
}

function registerUser(data) {
  const sheet = getSheet(SHEET_USERS);
  sheet.appendRow([
    data.name,
    data.email,
    new Date(),
    Utilities.getUuid()
  ]);

  return jsonResponse({ status: "registered" });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}