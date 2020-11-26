

  
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
  fetch(url, opts).then(response => {
    console.log(response)
    if (!response.ok) {
      throw Error('ERROR')
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data.products);
    const items = data.data.products.map(contents => {
      return ` <div class="item">
      <img src=${contents.image_url} alt="">
      <div class="discrpt">
          <p>${contents.title}</p>
          <span id="price">$${contents.price}.00</span>
      </div>
      <button>${cartbtn}</button>
  </div>`
    })
    .join("");

document.querySelector(".product-container").innerHTML = items;

  }).catch(error => {
    console.log(error);
  })
}

var cartbtn = 'add to cart'

function btn() {
  cartbtn.addEventListener("click")
}
btn();

  
let wi = window.addEventListener("DOMContentLoaded", () => {
  app();
 

});


