const STATE_SHEET = "AppState";
const USERS_SHEET = "Users";

function setupOnce() {
  PropertiesService.getScriptProperties().setProperties({
    ADMIN_ID: "SURESH9549",
    ADMIN_PASSWORD: "SURESH9549"
  }, true);

  ensureSheet_(STATE_SHEET, ["Key", "Value", "Updated At"]);
  ensureSheet_(USERS_SHEET, ["Timestamp", "Name", "Mobile", "Event", "Test", "Score", "Raw Data"]);
}

function doGet(e) {
  const action = (e.parameter.action || "").trim();

  if (action === "getState") {
    return jsonp_(e, getState_());
  }

  return jsonp_(e, {
    ok: true,
    message: "Test series backend is running."
  });
}

function doPost(e) {
  const data = parseBody_(e);

  if (data.action === "saveState") {
    return json_(saveState_(data));
  }

  return json_(saveUser_(data));
}

function getState_() {
  const sheet = ensureSheet_(STATE_SHEET, ["Key", "Value", "Updated At"]);
  const rows = sheet.getDataRange().getValues();
  const values = {};

  for (let i = 1; i < rows.length; i++) {
    values[rows[i][0]] = rows[i][1];
  }

  const hasState = Boolean(values.tests || values.notes);

  return {
    ok: true,
    hasState,
    tests: values.tests ? JSON.parse(values.tests) : [],
    notes: values.notes ? JSON.parse(values.notes) : [],
    updatedAt: values.updatedAt || ""
  };
}

function saveState_(data) {
  const props = PropertiesService.getScriptProperties();
  const adminId = props.getProperty("ADMIN_ID");
  const adminPassword = props.getProperty("ADMIN_PASSWORD");

  if (String(data.adminId || "").toUpperCase() !== adminId ||
      String(data.adminPassword || "").toUpperCase() !== adminPassword) {
    return {
      ok: false,
      message: "Invalid admin login."
    };
  }

  setStateValue_("tests", JSON.stringify(data.tests || []));
  setStateValue_("notes", JSON.stringify(data.notes || []));
  setStateValue_("updatedAt", new Date().toISOString());

  return {
    ok: true,
    message: "State saved."
  };
}

function saveUser_(data) {
  const sheet = ensureSheet_(USERS_SHEET, ["Timestamp", "Name", "Mobile", "Event", "Test", "Score", "Raw Data"]);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.mobile || "",
    data.event || "",
    data.test || "",
    data.score || "",
    JSON.stringify(data)
  ]);

  return {
    ok: true,
    message: "User data saved."
  };
}

function setStateValue_(key, value) {
  const sheet = ensureSheet_(STATE_SHEET, ["Key", "Value", "Updated At"]);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      sheet.getRange(i + 1, 2, 1, 2).setValues([[value, new Date()]]);
      return;
    }
  }

  sheet.appendRow([key, value, new Date()]);
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function ensureSheet_(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonp_(e, data) {
  const callback = e.parameter.callback;
  const output = callback
    ? `${callback}(${JSON.stringify(data)});`
    : JSON.stringify(data);

  return ContentService
    .createTextOutput(output)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
