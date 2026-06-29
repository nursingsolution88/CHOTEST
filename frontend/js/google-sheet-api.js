// Nursing Solution Test Series
// Google Sheet API connection template

const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

async function getTests(){
 try{
  const response = await fetch(API_URL);
  return await response.json();
 }catch(error){
  console.log('API Error',error);
  return [];
 }
}

async function saveTestResult(result){
 await fetch(API_URL,{
  method:'POST',
  body:JSON.stringify(result)
 });
}
