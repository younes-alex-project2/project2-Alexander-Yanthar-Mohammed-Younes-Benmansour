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
const ulCartImages = document.querySelector(".ul-cart-images");

mainContainer.addEventListener("click", function (e) {
  updateCart(e, true);
});

ulCartImages.addEventListener("click", function (e) {
  updateCart(e, false);
});

const displayItems = (arrayOfItems, node) => {
  // console.log(arrayOfItems);
  node.innerHTML = ``;
  arrayOfItems.forEach((item) => {
    const liItem = document.createElement(`li`);
    const imgItem = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const itemPrice = document.createElement(`p`);
    const itemBtn = document.createElement(`button`);
    // const spanItem = document.createElement(`span`);
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
    itemBtn.classList.add("add-item", "fa-solid", "fa-cart-plus");
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

    // console.log(allItems, inCart);
    displayItems(allItems, mainContainer);
    displayCartItems(cartItems, ulCartImages);
  } else {
    console.log(`No data to report`);
  }
  console.log(cartItems);
  console.log(allItems);
});

function updateCart(e, addToCart) {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.id;
    const itemId = `item0${id}`;
    const itemRef = ref(database, `/items/${itemId}`);
    update(itemRef, { inCart: addToCart });
  }
}

// ulCartImages.addEventListener('click', function(e) {
//   updateCart(e, false);
// })

// end of firebase config

// -----creating variables for the cart icon and the items -----------
let cartCheckOut = document.getElementById(`cart-checkout`);
let cartPage = document.getElementById(`cart-page`);
let addItem = document.querySelector(`.add-item`);
let cartNumber = document.getElementById(`cart-number`);
let count = 0;
// const imgProd1 = document.getElementById(`prod1`);
// imgProd1.src = "./assets/prod-1.jpg";

// making variables for empty cart

const emptyText = document.getElementById(`empty-text`);
const purchaseBtn = document.getElementById(`purchase-btn`);

// ----------- pop-ip the cart's page -----------
cartCheckOut.addEventListener(`click`, function () {
  cartPage.classList.toggle(`active-cart`);
});

// ---------------End with cart page pop up -----------------------------

//------- making the counter working in the icon after clicking in the item---------------

mainContainer.addEventListener(`click`, function (event) {
  // console.log(event.target);
  count++;
  cartNumber.textContent = count;
  // console.log(count);
  emptyText.style.display = `none`;
  purchaseBtn.style.display = `none`;

  // if (event.target.itemBtn === `BUTTON`) {
  //   id = event.target.id;
  //   console.log(id);
  // }

  //   display image in the cart page
});

// ------------------End with counter in the icon --------------------------------

// Display item in cart function

const displayCartItems = (arrOfItems, node) => {
  node.innerHTML = "";

  arrOfItems.forEach((item) => {
    const liItem = document.createElement(`li`);
    const imgItem = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const itemPrice = document.createElement(`p`);
    const removeBtn = document.createElement(`button`);
    const quantity = document.createElement("span");

    itemName.textContent = item.name;
    itemPrice.textContent = `$${item.price}`;
    itemPrice.classList.add("itemPrice");

    imgItem.src = item.image;
    removeBtn.id = item.id;
    imgItem.alt = item.name;
    removeBtn.classList.add("fa-solid", "fa-cart-arrow-down");

    quantity.textContent = item.quantity || 0;
    liItem.append(imgItem);
    liItem.append(quantity);
    liItem.append(itemName);
    liItem.append(itemPrice);
    liItem.append(removeBtn);

    node.append(liItem);

    // adding classes

    liItem.classList.add(`liItem`);
    imgItem.classList.add(`imgItem`);
    itemName.classList.add(`itemName`);
    itemPrice.classList.add(`itemPrice`);
    removeBtn.classList.add(`removeBtn`);
    quantity.classList.add(`quantity`);
  });
};
