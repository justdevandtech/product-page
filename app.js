
const cartIcon = document.getElementById("cart-icon");
const cartitem = document.querySelector(".cartitem");
const closecart = document.querySelector(".closecart");
  
const query = `
query {
    products{
      
      id
       image_url
      title
      price(currency:USD)
      product_options{
        title
        prefix
        suffix
        options{
          id
          value
        }
      }
    }
      
    }
`;
const url = "https://pangaea-interviews.now.sh/api/graphql";



function app() {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };

 

  if(!localStorage.getItem('cart')){
    localStorage.setItem('cart', JSON.stringify([]));
  } else {

    let cart  = JSON.parse(localStorage.getItem('cart'));
    cartitem.innerHTML = '';
    const cartspert =cart.map(cartsitems => {
      return ` <div class="cartpros">
      <img id="cartimg" src=${cartsitems.image_url} alt="">
      <span id="cartprice">${cartsitems.price}</span>
      <input type="number" id="cartnum" value="0">
      <span id="plus" onclick="cartAdd">+</span>
      <span id="subtra">-</span>
      <span id="removeitem" onclick="removeItem(${cartsitems.id})">remove</span>
  </div>`
    })
    .join("");
    cartitem.innerHTML+=`${cartspert}<br />`;
  }
  

  fetch(url, opts).then(response => {
    //console.log(response)
    if (!response.ok) {
      throw Error('ERROR')
    }
    return response.json();
  })
  .then(data => {
    // console.log(JSON.stringify(data.data.products[0]));
    localStorage.setItem('products', JSON.stringify(data.data.products));
    const items = data.data.products.map(contents => {
      return ` <div class="item">
      <img src=${contents.image_url} alt="">
      <div class="discrpt">
          <p id="title">${contents.title}</p>
          <span id="price">$${contents.price}.00</span>
      </div>
      <button id="addbtn" onclick="myitem(${contents.id})">add</button>
  </div>`
    })
    .join("");

document.querySelector(".product-container").innerHTML = items;

  }).catch(error => {
    console.log(error);
  })
}
app();


function myitem(itemId) {
 // console.log(itemId);
 cartitem.classList.add("cartitem-active");

  let products   =  JSON.parse(localStorage.getItem('products'));

 // console.log('Check  ', products);

  for (let i = 0; i < products.length; i++) {
    if(products[i]['id'] === itemId){
      let cart  = JSON.parse(localStorage.getItem('cart')); 
     // console.log('cccc', typeof cart)
      cart.push(products[i]);
      localStorage.setItem('cart', JSON.stringify(cart));

      const cartspert =cart.map(cartsitems => {
        return ` <div class="cartpros">
        <img id="cartimg" src=${cartsitems.image_url} alt="">
        <span id="cartprice">$${cartsitems.price}.00</span>
        <input type="number" id="cartnum" value="0">
        <span id="plus" onclick="cartAdd">+</span>
        <span id="subtra">-</span>
        <di>
        <span id="removeitem" onclick="removeItem(${cartsitems.id})">remove</span>
        </div>
    </div>`
      })
      .join("");
      cartitem.innerHTML+=`${cartspert}<br />`;
      
    }
  }
  
}

function removeItem(itemId) {
  console.log(itemId);

  let cart  = JSON.parse(localStorage.getItem('cart'));

  for (let a = 0; a < cart.length; a++) {
    
    if(cart[a]['id'] === itemId){
     cart.splice(a,1);
    }

    console.log('Check => ', cart)
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
    cartitem.classList.add("cartitem-active");

    
    
  }

}



  



//opening cart
cartIcon.addEventListener("click", function () {
  cartitem.classList.toggle("cartitem-active");
});

//closing cart after opening
/*closecart.addEventListener("click", function () {
  cartitem.classList.remove("cartitem-active");
});*/

