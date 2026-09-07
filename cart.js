const cartItems=document.querySelector("#cart-items");
const subtotalElement=document.querySelector("#subtotal");
const totalElement=document.querySelector("#total");
const checkout=document.querySelector("#checkout");

let cart=JSON.parse(localStorage.getItem("veloraCart"))||[];

function formatPrice(price){
return "₹"+price.toLocaleString("en-IN");
}

function saveCart(){
localStorage.setItem("veloraCart",JSON.stringify(cart));
}

function renderCart(){

cartItems.innerHTML="";

if(cart.length===0){

cartItems.innerHTML=`
<div class="empty">
<h2>Your bag is empty.</h2>
<p>Looks like you haven't found your next favourite piece yet.</p>
<a href="index.html#shop" class="shop-btn">EXPLORE THE COLLECTION ↗</a>
</div>
`;

subtotalElement.textContent="₹0";
totalElement.textContent="₹0";

return;
}

let subtotal=0;

cart.forEach((item,index)=>{

const itemTotal=item.price*item.quantity;

subtotal+=itemTotal;

cartItems.innerHTML+=`

<article class="cart-item">

<div class="cart-image">
<img src="${item.image}" alt="${item.name}">
</div>

<div class="item-info">

<div>
<span class="item-category">${item.category}</span>
<h2 class="item-name">${item.name}</h2>
<p class="item-price">${formatPrice(item.price)}</p>
</div>

<div class="item-actions">

<div class="qty">

<button onclick="changeQuantity(${index},-1)">−</button>

<span>${item.quantity}</span>

<button onclick="changeQuantity(${index},1)">+</button>

</div>

<button class="remove" onclick="removeItem(${index})">
REMOVE
</button>

</div>

</div>

<div class="item-total">

<strong>${formatPrice(itemTotal)}</strong>

</div>

</article>

`;

});

subtotalElement.textContent=formatPrice(subtotal);
totalElement.textContent=formatPrice(subtotal);

}

function changeQuantity(index,change){

cart[index].quantity+=change;

if(cart[index].quantity<=0){
cart.splice(index,1);
}

saveCart();
renderCart();

}

function removeItem(index){

cart.splice(index,1);

saveCart();
renderCart();

}

checkout.addEventListener("click",()=>{

if(cart.length===0){

alert("Your bag is empty.");

return;

}

alert("Checkout page coming next ✦");

});

renderCart();