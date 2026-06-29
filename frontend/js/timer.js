// NSO Test Timer
let timeLeft = 3600;
let timer;

function startTimer(callback){
 timer = setInterval(function(){
  timeLeft--;
  let display=document.getElementById('timer');
  if(display){
   display.innerHTML='Time Left: '+timeLeft+' sec';
  }
  if(timeLeft<=0){
   clearInterval(timer);
   if(callback){callback();}
  }
 },1000);
}

function stopTimer(){
 clearInterval(timer);
}
