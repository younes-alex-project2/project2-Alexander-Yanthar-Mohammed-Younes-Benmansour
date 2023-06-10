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

// Display item in cart function

const displayCartItems = (arrOfItems, node) => {
  node.innerHTML = '';

  arrOfItems.forEach((item) => {
    if (item.quantity > 0) {
      // Add createElements for the all the elements to be appended - need Younes' code to start

      // Set all the created Elements to the proper values
      // ex. img.src = item.image, img.alt = item.name, etc.
      // append all the items in proper order to list and then the list to node.

      // can dynmically add the totalValue to the bottom of this element to show the total value of all items.
    }
  })
}
