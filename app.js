

  
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
  }
  

  fetch(url, opts).then(response => {
    console.log(response)
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

function myitem(itemId) {
  
  console.log(itemId);

  let products   =  JSON.parse(localStorage.getItem('products'));

  console.log('Check  ', products);

 

  for (let i = 0; i < products.length; i++) {
    if(products[i]['id'] === itemId){
      let cart  = JSON.parse(localStorage.getItem('cart')); 
      console.log('cccc', typeof cart)
      cart.push(products[i]);
      localStorage.setItem('cart', JSON.stringify(cart));
    
      return;
    }
    
  }


}








  
window.addEventListener("DOMContentLoaded", () => {
  app();
 
});


