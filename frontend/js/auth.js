// NSO Student Authentication

function registerStudent(student){
 localStorage.setItem('nso_user', JSON.stringify(student));
}

function loginStudent(email,password){
 let user=JSON.parse(localStorage.getItem('nso_user'));
 return user && user.email===email && user.password===password;
}

function getCurrentUser(){
 return JSON.parse(localStorage.getItem('nso_user'));
}
