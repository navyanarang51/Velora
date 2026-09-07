const loader=document.querySelector(".loader");
const header=document.querySelector("#header");
const menuBtn=document.querySelector("#menu-btn");
const mobileMenu=document.querySelector("#mobile-menu");
const bagCount=document.querySelector("#bag-count");
const toast=document.querySelector("#toast");
const topBtn=document.querySelector("#top-btn");
const hearts=document.querySelectorAll(".heart");
const addButtons=document.querySelectorAll(".add");
const newsletterForm=document.querySelector("#newsletter-form");
const email=document.querySelector("#email");
const newsletterMessage=document.querySelector("#newsletter-message");
const loginLink=document.querySelector("#login-link");
const signupLink=document.querySelector("#signup-link");

window.addEventListener("load",()=>{
    setTimeout(()=>{
        loader.classList.add("hidden");
        document.body.classList.add("loaded");
    },3000);
});

window.addEventListener("scroll",()=>{
    header.classList.toggle("scrolled",window.scrollY>60);
    topBtn.classList.toggle("show",window.scrollY>500);
});

menuBtn.addEventListener("click",()=>{
    mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link=>{
    link.addEventListener("click",()=>{
        mobileMenu.classList.remove("open");
    });
});

let count=Number(localStorage.getItem("veloraBag"))||0;
bagCount.textContent=count;

let loggedIn=localStorage.getItem("veloraLoggedIn")==="true";

function updateNavbar(){

    if(loggedIn){

        loginLink.textContent="Account";
        loginLink.href="#";

        signupLink.textContent="Logout";
        signupLink.href="#";

        signupLink.onclick=(e)=>{
            e.preventDefault();

            localStorage.removeItem("veloraLoggedIn");

            loggedIn=false;

            updateNavbar();

            showToast("You have been logged out.");
        };

    }else{

        loginLink.textContent="Login";
        loginLink.href="login.html";

        signupLink.textContent="Sign Up";
        signupLink.href="login.html";

        signupLink.onclick=null;
    }
}

updateNavbar();

addButtons.forEach(button=>{

button.addEventListener("click",()=>{

if(!loggedIn){

localStorage.setItem("veloraPendingProduct",button.dataset.product);

window.location.href="login.html";

return;

}

let cart=JSON.parse(localStorage.getItem("veloraCart"))||[];

const productName=button.dataset.product;

const existing=cart.find(item=>item.name===productName);

if(existing){

existing.quantity++;

}else{

cart.push({

name:productName,

price:Number(button.dataset.price),

category:button.dataset.category,

image:button.dataset.image,

quantity:1

});

}

localStorage.setItem("veloraCart",JSON.stringify(cart));

const totalQuantity=cart.reduce(
(sum,item)=>sum+item.quantity,0
);

localStorage.setItem("veloraBag",totalQuantity);

bagCount.textContent=totalQuantity;

showToast(`${productName} added to your bag ✦`);

setTimeout(()=>{
window.location.href="cart.html";
},600);

});

});

hearts.forEach(heart=>{

    heart.addEventListener("click",()=>{

        heart.classList.toggle("active");

        heart.textContent=
            heart.classList.contains("active")?"♥":"♡";

    });

});

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2200);

}

newsletterForm.addEventListener("submit",event=>{

    event.preventDefault();

    const value=email.value.trim();

    if(!value||!value.includes("@")){

        newsletterMessage.textContent=
            "Please enter a valid email address.";

        return;
    }

    newsletterMessage.textContent=
        "Welcome to Velora. You're on the list ✦";

    newsletterForm.reset();

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",event=>{

        const href=link.getAttribute("href");

        if(href==="#")return;

        const target=document.querySelector(href);

        if(target){

            event.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});