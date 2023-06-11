// firebase confing

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  onValue,
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

const displayItems = (arrayOfItems, node) => {
  // console.log(arrayOfItems);
  node.innerHTML = ``;
  arrayOfItems.forEach((item) => {
    const liItem = document.createElement(`li`);
    const imgItem = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const itemPrice = document.createElement(`p`);
    const itemBtn = document.createElement(`button`);
    const spanItem = document.createElement(`span`);
    const individualItem = document.createElement(`div`);
    const itemTextContainer = document.createElement(`div`);
    const textContainer = document.createElement(`div`);
    liItem.classList.add(`mainContainerItems`, `flexColumn`);
    individualItem.classList.add(`individualItem`, `flexColumn`);
    itemTextContainer.classList.add(
      `itemTextContainer`,
      `itemTextContainer${item.id}`,
      `flexRow`
    );
    textContainer.classList.add(`textContainer`);
    spanItem.id = item.id;
    imgItem.src = item.image;
    spanItem.classList.add(`fa-solid`, `fa-cart-plus`);
    itemName.textContent = item.name;
    itemPrice.textContent = `$${item.price}`;
    itemPrice.classList.add(`price`);
    textContainer.append(itemPrice);
    textContainer.append(itemName);
    itemBtn.append(spanItem);
    textContainer.append(itemBtn);
    itemTextContainer.append(textContainer);
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
    console.log(data.val());
    const payload = data.val().items;
    console.log(payload);
    for (let item in payload) {
      allItems.push(payload[item]);
    }
    console.log(allItems);
  } else {
    console.log(`No data to report`);
  }
});

// end of firebase config

// -----creating variables for the cart icon and the items -----------
let cartCheckOut = document.getElementById(`cart-checkout`);
let cartPage = document.getElementById(`cart-page`);
let addItem = document.getElementById(`add-item`);
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

addItem.addEventListener(`click`, function (event) {
  console.log(event.target);
  count++;
  cartNumber.textContent = count;
  console.log(count);
  emptyText.style.display = `none`;
  purchaseBtn.style.display = `none`;

  // if (event.target.itemBtn === `button`) {
  //   spanItem.id = event.target.id;
  //   console.log(id);
  // }

  //   display image in the cart page
});

// ------------------End with counter in the icon --------------------------------
