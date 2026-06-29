// NSO API Layer (Google Apps Script Connector)

const API_BASE_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

async function postData(payload) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// Get Questions
async function fetchQuestions(testName) {
  return await postData({
    action: "getQuestions",
    testName: testName
  });
}

// Save Result
async function saveResult(data) {
  return await postData({
    action: "saveResult",
    ...data
  });
}

// Register User
async function registerUser(user) {
  return await postData({
    action: "registerUser",
    ...user
  });
}