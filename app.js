

  
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
          <p id="title">${contents.title}</p>
          <span id="price">$${contents.price}.00</span>
      </div>
      <button></button>
  </div>`
    })
    .join("");

document.querySelector(".product-container").innerHTML = items;

  }).catch(error => {
    console.log(error);
  })
}


/*var aabtn = document.getElementById('btn');
let cartbtn = document.createElement('button');
cartbtn.innerHTML = "Add To Cart";
//aabtn.appendChild(cartbtn);

aabtn.addEventListener ("click", function() {
  alert("did something");
});
*/





  
let wi = window.addEventListener("DOMContentLoaded", () => {
  app();
 

});


