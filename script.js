// -----creating variables for the cart icon and the items -----------
let cartCheckOut = document.getElementById(`cart-checkout`);
let cartPage = document.getElementById(`cart-page`);
let addItem = document.getElementById(`add-item`);
let cartNumber = document.getElementById(`cart-number`);
let count = 0;
const imgProd1 = document.getElementById(`prod1`);
imgProd1.src = "./assets/prod-1.jpg";

// making variables for empty cart

const emptyText = document.getElementById(`empty-text`);
const purchaseBtn = document.getElementById(`purchase-btn`);

// ----------- pop-ip the cart's page -----------
cartCheckOut.addEventListener(`click`, function () {
  cartPage.classList.toggle(`active-cart`);
});

// ---------------End with cart page pop up -----------------------------

//------- making the counter working in the icon after clicking in the item---------------

addItem.addEventListener(`click`, function () {
  count++;
  cartNumber.textContent = count;
  console.log(count);
  emptyText.style.display = `none`;
  purchaseBtn.style.display = `none`;

  //   display image in the cart page
});

// ------------------End with counter in the icon --------------------------------
