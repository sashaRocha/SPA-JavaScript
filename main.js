

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
     cart.classList.add('active');
}
closeCart.onclick = () =>{
    cart.classList.remove('active');
}

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}



function ready(){
    let cartRemove = document.getElementsByClassName('cart-remove');
    for(let i= 0;i<cartRemove.length;i++){
      let button = cartRemove[i];
      button.addEventListener('click', removeCartItem);
    
    }
    let addCart = document.getElementsByClassName('add-cart');
    console.log(addCart);
     
    for(let i= 0;i<addCart.length;i++){
      addCart[i].addEventListener('click', addCartItem);
      
    }
    
   let quantityInputs = document.getElementsByClassName('cart-quantity')
   for(let i =0;i<quantityInputs.length;i++){
      let input = quantityInputs[i];
      input.addEventListener('change', quantityChange);
    
    }
    let button = document.getElementsByClassName('btn-buy')[0];
      button.addEventListener('click', buyItems);

}


function buyItems(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild);
      updateTotal();
   }
   Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'THANKS FOR YOUR PURCHASE',
    showConfirmButton: false,
    timer: 1000,
  })
}

function removeCartItem(e){
  let buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantityChange(e){
    let input = e.target;
    (isNaN(input.value) || input.value <= 0) ? input.value = 1 : updateTotal();
}

function addCartItem(e){
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].textContent;
    let price = shopProducts.getElementsByClassName('price')[0].textContent;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updateTotal()
     localStorage.setItem('Title',title);
    localStorage.setItem('Price',price);
    Toastify({
    text: 'ADDED PRODUCT',
    duration: 700,
    position: 'left',
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
  }).showToast();
   
}

function addProductToCart(title,price,productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    
    for(let i = 0; i < cartItemsNames.length;i++)
    {
       if(cartItemsNames[i].textContent === title)

        return cartShopBox;
    }
    cartShopBox.innerHTML = 
                        `<img src="${productImg}" alt="" class="cart-img">
                          <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                          </div>
                          <i class='bx bxs-trash-alt cart-remove' ></i>`
    
cartItems.appendChild(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChange);
console.log(addProductToCart);
}


function updateTotal(){
let cartContent = document.getElementsByClassName('cart-content')[0];
let cartBoxes = cartContent.getElementsByClassName('cart-box');
let total = 0;

for(let i= 0;i<cartBoxes.length;i++){
let cartBox = cartBoxes[i];
let priceElement =cartBox.getElementsByClassName('cart-price')[0];
let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
let quantity = quantityElement.value;
let price = Number(priceElement.innerText.replace('$',''));
total = total + price * quantity;
}

total = Math.round(total * 100) / 100;
document.getElementById('numero').innerText = `$${total.toFixed(3)}`;


}





