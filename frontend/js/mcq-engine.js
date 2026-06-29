// NSO MCQ Engine
let questions=[];
let current=0;
let answers={};

function loadQuestions(data){
 questions=data;
 showQuestion();
}

function showQuestion(){
 if(!questions[current]) return;
 document.getElementById('question').innerHTML=questions[current].question;
}

function selectAnswer(value){
 answers[current]=value;
}

function getScore(){
 let score=0;
 questions.forEach(function(q,i){
  if(answers[i]===q.answer){score++;}
 });
 return score;
}
