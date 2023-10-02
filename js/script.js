"use strict";

let userName;
let lastInteractiontime = Date.now();
const maxSessionTime = 10000000 * 60 * 1000;
const siginInMail = document.querySelector("#email");
const signInPassword = document.querySelector("#password");
const regName = document.querySelector("#regName");
const regEmail = document.querySelector("#regEmail");
const regPassword = document.querySelector("#regPassword");
let logOutCTA = "";
const signInCTA = document.querySelectorAll(".sign-in");
const signOnCTA = document.querySelector(".sign-on");
const navigation = document.querySelector(".header-navs");
const loginErrorMessage = document.querySelector(".error-sign");
const loginBackDrop = document.querySelector(".back-sign");
const signInPage = document.querySelector(".form");
const email = document.querySelector("#email");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".mobile-header-navs");
const backDrop = document.querySelector(".back-drop");
const mainProducts = document.querySelector(".products");
const facets = document.querySelector(".left-nav-items");
const leftNavBar = document.querySelector(".left-nav-bar");
const facetSet = new Set();

let users = [
  {
    name: "Regin Benzer",
    email: "breginbenzer@gmail.com",
    password: "Regino@10",
  },
  {
    name: "Regin Benzer",
    email: "bregin",
    password: "Regino@10",
  },
];

const cateogries = ["Electronics", "Grocery", "Medicine", "Food", "Clothing"];
const products = {
  [cateogries[0]]: {
    1: { name: "Product-1", price: "₹ 100/-" },
    2: { name: "Product-2", price: "₹ 536/-" },
  },
  [cateogries[1]]: {
    21: { name: "Product-21", price: "₹ 674/-" },
    22: { name: "Product-22", price: "₹ 636/-" },
  },
  [cateogries[2]]: {
    41: { name: "Product-41", price: "₹ 536/-" },
    42: { name: "Product-42", price: "₹ 938/-" },
  },
  [cateogries[3]]: {
    61: { name: "Product-61", price: "₹ 536/-" },
    62: { name: "Product-62", price: "₹ 936/-" },
  },
  [cateogries[4]]: {
    81: { name: "Product-81", price: "₹ 264/-" },
    82: { name: "Product-82", price: "₹ 735/-" },
  },
};

//To add facet
if (leftNavBar) {
  for (const category of cateogries) {
    const filter = document.createElement("span");
    filter.classList = "left-nav-item";
    filter.textContent = category;
    facets.appendChild(filter);
  }
}

//To update products
function productAdd(category) {
  if (products[category]) {
    const categoryEntry = Object.entries(products[category]);
    for (const [id, data] of categoryEntry) {
      const newDiv = document.createElement("div");
      newDiv.classList = "product";

      const imageSpan = document.createElement("span");
      imageSpan.classList = "product-image";

      const image = document.createElement("img");
      image.src = `../images/products/${category}.jpg`;

      const contentSpan = document.createElement("span");
      contentSpan.classList = "product-content";

      const contentSpanChildOne = document.createElement("span");
      contentSpanChildOne.classList = "product-details";

      const productName = document.createElement("div");
      productName.classList = "product-name";
      productName.textContent = data.name;

      const productPrice = document.createElement("div");
      productPrice.classList = "product-price";
      productPrice.textContent = data.price;

      const contentSpanChildTwo = document.createElement("span");
      contentSpanChildTwo.classList = "add-to-cart";

      const addToCart = document.createElement("button");
      addToCart.type = "submit";
      addToCart.textContent = "ADD TO CART";

      mainProducts.appendChild(newDiv);
      newDiv.appendChild(imageSpan);
      imageSpan.appendChild(image);
      newDiv.appendChild(contentSpan);
      contentSpan.appendChild(contentSpanChildOne);
      contentSpanChildOne.appendChild(productName);
      contentSpanChildOne.appendChild(productPrice);
      contentSpan.appendChild(contentSpanChildTwo);
      contentSpanChildTwo.appendChild(addToCart);
    }
  }
}

//To add products
function populateProducts() {
  if (mainProducts) {
    if (facetSet.size > 0) {
      mainProducts.innerHTML = "";
      for (const category of facetSet) {
        productAdd(category);
      }
    } else {
      mainProducts.innerHTML = "";
      for (const category of cateogries) {
        productAdd(category);
      }
    }
  }
}

populateProducts();

//To filter products
for (const category of document.querySelectorAll(".left-nav-item")) {
  category.addEventListener("click", function () {
    if (facetSet.has(category.textContent)) {
      facetSet.delete(category.textContent);
      populateProducts();
    } else {
      facetSet.add(category.textContent);
      populateProducts();
    }
  });
}

//user validation
function userValidation(inEmail, inPassword) {
  let a = false;
  for (let user of users) {
    const { name, email, password } = user;
    if (inEmail === email && inPassword === password) {
      userName = name;
      a = true;
      return a;
      break;
    } else {
      a = false;
    }
  }
  return a;
}

//signIn
function login(event) {
  event.preventDefault();
  if (validateEmail(siginInMail.value)) {
    if (userValidation(siginInMail.value, signInPassword.value)) {
      setData("name", userName);

      window.location.href = "index.html";
    } else {
      signInPage.style.display = "none";
      loginErrorMessage.classList.add("error-message-sign");
      loginBackDrop.classList.add("back-drop-sign");
      loginErrorMessage.textContent = "User not found. Click Sign Up";

      setTimeout(function () {
        window.location.href = "signIn.html";
      }, 3000);
    }
  } else {
    signInPage.style.display = "none";
    loginErrorMessage.classList.add("error-message-sign");
    loginBackDrop.classList.add("back-drop-sign");
    loginErrorMessage.textContent = "Kindly Enter the Proper email Format";

    setTimeout(function () {
      window.location.href = "signIn.html";
    }, 3000);
  }
}

//To validate the email address entered
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//To update the nav bar if we logined
if (getData("name")) {
  logoutAdd();

  for (const signIn of signInCTA) {
    if (signIn) {
      signIn.textContent = `Welcome ${getData("name")}`;
      signIn.style.color = "goldenrod";
    }
  }

  if (signOnCTA) {
    signOnCTA.style.display = "none";
  }
}

//To add the logout button post login

function logoutAdd() {
  const newItem = document.createElement("li");
  newItem.classList.add("log-out");
  newItem.textContent = "LOGOUT";
  navigation.appendChild(newItem);
  logOutCTA = document.querySelector(".log-out");

  logOutCTA.addEventListener("click", function () {
    localStorage.removeItem("name");
    window.location.href = "index.html";
  });
}

//To set and get a data in the local storage
function setData(key, value) {
  localStorage.setItem(key, value);
}

function getData(key) {
  const data = localStorage.getItem(key);
  return data;
}

//Event Listeners for timeout
document.addEventListener("mousemove", function () {
  lastInteractiontime = Date.now();
});

document.addEventListener("click", function () {
  lastInteractiontime = Date.now();
});

document.addEventListener("keydown", function () {
  lastInteractiontime = Date.now();
});

//To restore the index.html after the session inactivity
setInterval(function () {
  const currentTime = Date.now();

  if (currentTime - lastInteractiontime > maxSessionTime) {
    localStorage.removeItem("name");
    window.location.href = "index.html";
  }
}, 10000);

//Register a user
function register(event) {
  event.preventDefault();

  if (validateEmail(regEmail.value)) {
    if (getData("name")) {
      localStorage.removeItem("name");
      setData("name", regName.value);
    } else {
      setData("name", regName.value);
    }
    signInPage.style.display = "none";
    loginErrorMessage.classList.add("error-message-sign");
    loginBackDrop.classList.add("back-drop-sign");
    loginErrorMessage.textContent =
      "Please mail the login credentials to breginbenzer@gmail.com for future login.";

    setTimeout(function () {
      window.location.href = "index.html";
    }, 5000);
  } else {
    signInPage.style.display = "none";
    loginErrorMessage.classList.add("error-message-sign");
    loginBackDrop.classList.add("back-drop-sign");
    loginErrorMessage.textContent = "Kindly Enter the Proper email Format";

    setTimeout(function () {
      window.location.href = "signOn.html";
    }, 3000);
  }
}

//display and close the mobile nav
function mainDropDown() {
  if (menu) {
    menuNav.style.display = "flex";
    backDrop.style.display = "block";
  }
}

function closeMobileOptions() {
  menuNav.style.display = "none";
  backDrop.style.display = "none";
}

