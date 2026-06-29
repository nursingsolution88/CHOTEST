// NSO Student Result History

function saveLocalResult(result){
 let history = JSON.parse(localStorage.getItem('nso_results')) || [];
 history.push(result);
 localStorage.setItem('nso_results', JSON.stringify(history));
}

function getResultHistory(){
 return JSON.parse(localStorage.getItem('nso_results')) || [];
}

function displayHistory(){
 let data=getResultHistory();
 let box=document.getElementById('history');
 if(box){
  box.innerHTML=data.map(r=>`${r.testName} - ${r.percentage}%`).join('<br>');
 }
}
