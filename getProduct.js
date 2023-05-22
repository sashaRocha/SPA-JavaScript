
const contenedor = document.getElementsByClassName('section-products');
const addSectionProduct = async () =>{
    const resolve = await fetch('/stock.json');
    const data = await resolve.json();
    
    data.forEach((product) => {
      const div = document.createElement('div')
      div.classList.add('cart-content')
      div.innerHTML = 
                    `<div class="product-box">
                       <img src="${product.img}" alt="" class="product-img">
                       <h2 class="product-title">${product.name}</h2>
                       <spam class="price">$${product.price.toFixed(3)}</spam>
                       <i class='bx bx-shopping-bag add-cart'></i>
                    </div>`
         
    contenedor[0].append(div);
    });
  }

addSectionProduct();
updateTotal();
