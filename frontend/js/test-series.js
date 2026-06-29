// NSO Dynamic Test Series Loader

async function loadTestSeries(){
 const tests = await getTests();
 const container = document.getElementById('test-list');
 if(!container) return;

 tests.forEach(test=>{
  let card=document.createElement('div');
  card.className='test-card';
  card.innerHTML=`<h3>${test[0]}</h3><p>${test[1]}</p><button onclick="startTest('${test[0]}')">Start Test</button>`;
  container.appendChild(card);
 });
}

function startTest(testName){
 window.location.href='test.html?test='+encodeURIComponent(testName);
}
