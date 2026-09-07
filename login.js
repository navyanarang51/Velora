const loginTab=document.getElementById("loginTab");
const signupTab=document.getElementById("signupTab");
const loginForm=document.getElementById("loginForm");
const signupForm=document.getElementById("signupForm");
const switchSignup=document.getElementById("switchSignup");
const switchLogin=document.getElementById("switchLogin");

function showSignup(){
loginForm.classList.add("hidden");
signupForm.classList.remove("hidden");
loginTab.classList.remove("active");
signupTab.classList.add("active");
}

function showLogin(){
signupForm.classList.add("hidden");
loginForm.classList.remove("hidden");
signupTab.classList.remove("active");
loginTab.classList.add("active");
}

loginTab.addEventListener("click",showLogin);
signupTab.addEventListener("click",showSignup);
switchSignup.addEventListener("click",showSignup);
switchLogin.addEventListener("click",showLogin);

function togglePassword(id,button){
const input=document.getElementById(id);

if(input.type==="password"){
input.type="text";
button.textContent="HIDE";
}else{
input.type="password";
button.textContent="SHOW";
}
}

document.querySelector("#loginForm form").addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("loginEmail").value.trim();
const password=document.getElementById("loginPassword").value;

const message=document.getElementById("loginMessage");

if(!email.includes("@")){
message.textContent="Please enter a valid email address.";
return;
}

if(password.length<8){
message.textContent="Password must contain at least 8 characters.";
return;
}

localStorage.setItem("veloraLoggedIn","true");

message.textContent="Login successful. Welcome back ✦";

setTimeout(()=>{
    window.location.href="index.html";
},1000);

document.querySelector("#signupForm form").addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();
const email=document.getElementById("signupEmail").value.trim();
const password=document.getElementById("signupPassword").value;
const confirm=document.getElementById("confirmPassword").value;

const message=document.getElementById("signupMessage");

if(name.length<2){
message.textContent="Please enter your full name.";
return;
}

if(!email.includes("@")||!email.includes(".")){
message.textContent="Please enter a valid email address.";
return;
}

if(password.length<8){
message.textContent="Password must contain at least 8 characters.";
return;
}

if(password!==confirm){
message.textContent="Passwords do not match.";
return;
}

localStorage.setItem("veloraLoggedIn","true");

message.textContent="Account created successfully. Welcome to Velora ✦";

setTimeout(()=>{
    window.location.href="index.html";
},1000);
})});