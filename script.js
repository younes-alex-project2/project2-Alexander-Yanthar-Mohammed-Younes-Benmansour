// firebase confing

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt3ZlRjaXDwrkKK_-oKvcVVYlfggCxgoE",
  authDomain: "project-2-53d58.firebaseapp.com",
  projectId: "project-2-53d58",
  storageBucket: "project-2-53d58.appspot.com",
  messagingSenderId: "756070251061",
  appId: "1:756070251061:web:b44511ad0e75fccb78cf7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemsRef = ref(database);

const mainContainer = document.querySelector(".mainContainer");
const cartItems = [];
const ulCartImages = document.querySelector(".ulCartImages");

mainContainer.addEventListener("click", function (e) {
  updateCart(e, true);
});

ulCartImages.addEventListener("click", function (e) {
  updateCart(e, false);
});

const displayItems = (arrayOfItems, node) => {

  node.innerHTML = ``;
  arrayOfItems.forEach((item) => {
    const liItem = document.createElement(`li`);
    const imgItem = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const itemPrice = document.createElement(`p`);
    const itemBtn = document.createElement(`button`);
    const individualItem = document.createElement(`div`);
    const itemTextContainer = document.createElement(`div`);
    const textContainer = document.createElement(`div`);
    const iconContainer = document.createElement("div");
    liItem.classList.add(`mainContainerItems`, `flexColumn`);
    individualItem.classList.add(`individualItem`, `flexColumn`);
    itemTextContainer.classList.add(
      `itemTextContainer`,
      `itemTextContainer${item.id}`,
      `flexRow`
    );
    textContainer.classList.add(`textContainer`);
    iconContainer.classList.add("iconContainer");
    itemBtn.id = item.id;
    imgItem.src = item.image;
    itemBtn.classList.add("addItem", "fa-solid", "fa-cart-plus");

    itemName.textContent = item.name;
    itemPrice.textContent = `$${item.price}`;
    itemPrice.classList.add(`price`);
    textContainer.append(itemPrice);
    textContainer.append(itemName);
    iconContainer.append(itemBtn);
    itemTextContainer.append(textContainer);
    itemTextContainer.append(iconContainer);
    individualItem.append(imgItem);
    individualItem.append(itemTextContainer);
    liItem.append(individualItem);
    node.append(liItem);
  });
};

// onvalue

onValue(itemsRef, (data) => {
  const allItems = [];

  if (data.exists()) {
    const payload = data.val().items;
    for (let item in payload) {
      allItems.push(payload[item]);
    }

    cartItems.length = 0;

    allItems.forEach((item) => {
      if (item.inCart) {
        cartItems.push(item);
      }
    });

    displayItems(allItems, mainContainer);
    displayCartItems(cartItems, ulCartImages);
  }
});

function updateCart(e, addToCart) {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.id;
    const itemId = `item${id}`;
    const itemRef = ref(database, `/items/${itemId}`);

    get(itemRef).then((snapshot) => {
      const itemData = snapshot.val();
      if (itemData) {
        let newQuantity = (itemData.quantity || 0) + (addToCart ? 1 : -1);

        let newTotalItemPrices = newQuantity * itemData.price;

        const updateData = {
          quantity: newQuantity,
          inCart: newQuantity > 0,
          totalItemPrice: newTotalItemPrices,
        };
        update(itemRef, updateData)
          .then(() => {
            finalTotalPrice.textContent = `Total: $${calculateFinalTotalPrice()}`;
          })
          .catch((er) => {
            console.error(`failed`, er);
          });
      }
    });
  }
}


// end of firebase config

// -----creating variables for the cart icon and the items -----------
let cartCheckOut = document.getElementById(`cart-checkout`);
let cartPage = document.getElementById(`cart-page`);
let cartNumber = document.getElementById(`cart-number`);
let count = 0;

// making variables for empty cart

const emptyText = document.getElementById(`empty-text`);
const purchaseBtn = document.getElementById(`purchase-btn`);

// ---------------End with cart page pop up -----------------------------

//------- making the counter working in the icon after clicking in the item---------------

mainContainer.addEventListener(`click`, function () {
  count++;
  cartNumber.textContent = count;

  emptyText.style.display = `none`;
  purchaseBtn.style.display = `none`;
});

// ------------------End with counter in the icon --------------------------------
let finalTotalPrice = document.getElementById(`finalitemsprice`);
// Display item in cart function

const displayCartItems = (arrOfItems, node) => {
  node.innerHTML = "";

  arrOfItems.forEach((item) => {
    const liItem = document.createElement(`li`);
    const imgItem = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const newTotalItemPrices = document.createElement(`p`);
    const removeBtn = document.createElement(`button`);
    const quantity = document.createElement("span");

    itemName.textContent = item.name;
    newTotalItemPrices.textContent = `$${item.totalItemPrice}`;
    newTotalItemPrices.classList.add("itemPrice");

    imgItem.src = item.image;
    removeBtn.id = item.id;
    imgItem.alt = item.name;
    removeBtn.classList.add("fa-solid", "fa-cart-arrow-down");

    quantity.textContent = item.quantity || 0;
    liItem.append(imgItem);
    liItem.append(quantity);
    liItem.append(itemName);
    liItem.append(newTotalItemPrices);
    liItem.append(removeBtn);

    node.append(liItem);
    node.append(finalTotalPrice);

    // adding classes
    removeBtn.addEventListener(`click`, () => {
      count--;
      cartNumber.textContent = count;
    });

    liItem.classList.add(`liItem`);
    imgItem.classList.add(`imgItem`);
    itemName.classList.add(`itemName`);
    newTotalItemPrices.classList.add(`itemPrice`);
    removeBtn.classList.add(`removeBtn`);
    quantity.classList.add(`quantity`);
  });
};

// ----------- pop-ip the cart's page -----------
// making function for finalTotal price

cartCheckOut.addEventListener(`click`, function () {
  cartPage.classList.toggle(`active-cart`);
});

function calculateFinalTotalPrice() {
  let totalCount = 0;

  for (let i = 0; i < cartItems.length; i++) {

    totalCount += cartItems[i].totalItemPrice;
  }
  return totalCount;
}

