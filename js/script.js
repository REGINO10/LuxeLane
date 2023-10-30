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
const mobileFacet = document.querySelector(".mobile-facet");
const viewCart = document.querySelector(".cart-image");
const addtoCartMainDiv = document.querySelector(".add-products");
const cardNoProducts = document.querySelector(".cart-no-products");
const checkoutButton = document.querySelectorAll(".checkout");

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

let addToCartProducts = {};

//To add facet
if (leftNavBar) {
  cateogries.forEach((category) => {
    const filter = document.createElement("span");
    filter.classList = "left-nav-item";
    filter.textContent = category;
    facets.appendChild(filter);
  });
}

//To update products
function productAdd(category) {
  if (products[category]) {
    const categoryEntry = Object.entries(products[category]);

    categoryEntry.forEach((cat) => {
      const product = `<div class="product">
        <span class="product-image">
        <img src="../images/products/${category}.jpg">
        </span>
        <span class="product-content">
        <span class="product-details">
        <div class="product-name">${cat[1].name}</div>
        <div class="product-price">${cat[1].price}</div>
        </span>
        <span class="add-to-cart">
        <button type="submit" class="add-to-cart-button">ADD TO CART</button>
        </span>
        </span>
        </div>`;

      mainProducts.insertAdjacentHTML("beforeend", product);
    });
  }
}

//To add products
function populateProducts() {
  if (mainProducts) {
    if (facetSet.size > 0) {
      mainProducts.innerHTML = "";

      facetSet.forEach((category) => productAdd(category));
    } else {
      mainProducts.innerHTML = "";

      cateogries.forEach((category) => productAdd(category));
    }
  }
}

populateProducts();

//To filter products
const filterProducts = () => {
  for (const category of document.querySelectorAll(".left-nav-item")) {
    category.addEventListener("click", function () {
      if (facetSet.has(category.textContent)) {
        facetSet.delete(category.textContent);
        populateProducts();
        category.style.color = "black";
        category.style.fontWeight = "normal";
      } else {
        facetSet.add(category.textContent);
        populateProducts();
        category.style.color = "red";
        category.style.fontWeight = "bolder";
      }
    });
  }
};

filterProducts();

//user validation
function userValidation(inEmail, inPassword) {
  const a = users.some((user) => {
    if (user.email === inEmail && user.password === inPassword) {
      userName = user.name;
      return true;
    } else {
      return false;
    }
  });

  return a;
}

//Login error message
const errorMessage = (errMsg) => {
  signInPage.style.display = "none";
  loginErrorMessage.classList.add("error-message-sign");
  loginBackDrop.classList.add("back-drop-sign");
  loginErrorMessage.textContent = errMsg;

  setTimeout(function () {
    window.location.href = "signIn.html";
  }, 3000);
};

//signIn
function login(event) {
  event.preventDefault();
  if (validateEmail(siginInMail.value)) {
    if (userValidation(siginInMail.value, signInPassword.value)) {
      setData("name", userName);

      window.location.href = "index.html";
    } else {
      errorMessage("User not found. Click Sign Up");
    }
  } else {
    errorMessage("Kindly Enter the Proper email Format");
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
    backDrop.style.display = "flex";

    backDrop.style.justifyContent = "center";
    backDrop.style.alignItems = "center";

    const logoutChild = document.createElement("span");
    if (window.getComputedStyle(menu).getPropertyValue("display") === "none") {
      logoutChild.textContent = `Thanks for shoping ${localStorage
        .getItem("name")
        .toUpperCase()}. Wish you a great day from Luxe Lane 😊`;
    } else {
      logoutChild.textContent = `Thanks for shoping ${localStorage
        .getItem("name")
        .toUpperCase()} 😊`;
    }
    logoutChild.style.color = "black";
    logoutChild.style.padding = "2rem 0.5rem";
    logoutChild.style.background = "white";
    logoutChild.style.borderRadius = "1rem";
    logoutChild.style.fontWeight = "bolder";
    logoutChild.style.fontSize = "1.5rem";
    backDrop.appendChild(logoutChild);

    localStorage.removeItem("name");
    localStorage.removeItem("cartProducts");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
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
    errorMessage("Kindly Enter the Proper email Format");
  }
}

//display and close the mobile nav
function mainDropDown() {
  if (menu) {
    menuNav.style.display = "flex";
    menuNav.style.gap = "0.5rem";
    backDrop.style.display = "block";
  }
}

function closeMobileOptions() {
  menuNav.style.display = "none";
  backDrop.style.display = "none";
  mobileFacet.style.display = "none";
  mobileFacet.innerHTML = "";
}

//display and close mobile filter
function mobileFilter() {
  if (leftNavBar) {
    if (
      window.getComputedStyle(leftNavBar).getPropertyValue("display") === "none"
    ) {
      cateogries.forEach((category) => {
        const filter = document.createElement("span");
        filter.classList = "left-nav-item";
        filter.textContent = category;
        mobileFacet.appendChild(filter);
        if (facetSet.has(filter.textContent)) {
          filter.style.color = "red";
          filter.style.fontWeight = "bolder";
        }
      });

      filterProducts();

      mobileFacet.style.display = "flex";
      backDrop.style.display = "block";
    }
  }
}

//Add to cart
const addToCart = function () {
  if (mainProducts) {
    mainProducts.addEventListener("click", (e) => {
      if (JSON.parse(localStorage.getItem("cartProducts"))) {
        addToCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
      }
      let adcTargetParent = e.target.closest(".add-to-cart");
      const productTargetParent = e.target.closest(".product");
      const productName =
        productTargetParent.querySelector(".product-name").textContent;
      const productPrice =
        productTargetParent.querySelector(".product-price").textContent;
      const productImage = productTargetParent
        .querySelector("img")
        .getAttribute("src");

      //Adding to cart
      if (e.target.classList.contains("add-to-cart-button")) {
        adcTargetParent.innerHTML = "";
        const newAddToCart = `
    <span class="new-add-to-cart">
    <button class="atc-decrement">-</button>
    <span class="atc-product-count">1</span>
    <button class="atc-increment">+</button>
    </span>`;
        adcTargetParent.insertAdjacentHTML("afterbegin", newAddToCart);
        if (!addToCartProducts[productName]) {
          addToCartProducts[productName] = {};
        }

        if (addToCartProducts[productName].count > 0) {
          addToCartProducts[productName].count++;
        } else {
          addToCartProducts[productName].count = 1;
        }
        addToCartProducts[productName].price = productPrice
          .split(" ")[1]
          .replace("/-", "");
        addToCartProducts[productName].image = productImage;

        localStorage.setItem("cartProducts", JSON.stringify(addToCartProducts));
      }

      //Increasing product number
      if (e.target.classList.contains("atc-increment")) {
        let addedProductCount = e.target
          .closest(".add-to-cart")
          .querySelector(".atc-product-count");
        addedProductCount.textContent =
          Number(addedProductCount.textContent) + 1;

        addToCartProducts[productName].count++;

        localStorage.setItem("cartProducts", JSON.stringify(addToCartProducts));
      }

      //Decreasing product number
      if (e.target.classList.contains("atc-decrement")) {
        let addedProductCount = e.target
          .closest(".add-to-cart")
          .querySelector(".atc-product-count");
        if (Number(addedProductCount.textContent) - 1 === 0) {
          adcTargetParent.innerHTML = "";
          adcTargetParent.insertAdjacentHTML(
            "afterbegin",
            `<button type="submit" class="add-to-cart-button">ADD TO CART</button>`
          );
          delete addToCartProducts[productName];
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(addToCartProducts)
          );
        } else {
          addedProductCount.textContent =
            Number(addedProductCount.textContent) - 1;
          addToCartProducts[productName].count--;
        }

        localStorage.setItem("cartProducts", JSON.stringify(addToCartProducts));
      }
    });
  }
};

addToCart();

//Cart page
const cartPage = function () {
  if (viewCart) {
    viewCart.addEventListener("click", () => {
      if (!getData("name")) {
        window.location.href = "signIn.html";
      } else {
        window.location.href = "cart.html";
      }
    });
  }

  if (
    localStorage.getItem("cartProducts") &&
    Object.keys(JSON.parse(localStorage.getItem("cartProducts"))).length > 0
  ) {
    
    if (addtoCartMainDiv) {
      const cartProductsFromLS = localStorage.getItem("cartProducts");
      if (cartProductsFromLS) {
        const cartProducts = JSON.parse(cartProductsFromLS);

        Object.keys(cartProducts).forEach((key) => {
          const html = `<span class="add-product">
            <span class="add-product-name">${key}</span>
            <span class="add-product-img">
              <img src="${cartProducts[key].image}" />
            </span>
            <span class="add-data">
              <span class="add-product-price">₹ ${
                cartProducts[key].price
              }</span>
              <span class="mobile-remove">×</span>
              <span class="add-count">
                <button class="add-decrement">-</button>
                <span class="add-product-count">${
                  cartProducts[key].count
                }</span>
                <button class="add-increment">+</button>
              </span>
              <span class="mobile-remove">=</span>
              <span>₹ ${
                cartProducts[key].price * cartProducts[key].count
              }</span>
            </span>
          </span>`;

          addtoCartMainDiv.insertAdjacentHTML("afterbegin", html);
        });
      }
    }
  } else {
    if (addtoCartMainDiv) {
      cardNoProducts.style.display = "block";
      checkoutButton.forEach((button) => {
        button.style.display = "none";
      });
    }
  }
};

cartPage();

const increaseOrDecreaseProductFromCartPage = function () {
  const cartAddRemove = document.querySelectorAll(".add-count");

  //Cart add or decrease products
  if (addtoCartMainDiv) {
    addToCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    for (const ele of cartAddRemove) {
      ele.addEventListener("click", (e) => {
        const productCount = ele.querySelector(".add-product-count");
        const productName = e.target
          .closest(".add-product")
          .querySelector(".add-product-name").textContent;

        if (e.target.classList.contains("add-increment")) {

          productCount.textContent = Number(productCount.textContent) + 1;
          addToCartProducts[productName].count++;
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(addToCartProducts)
          );
        }

        if (e.target.classList.contains("add-decrement")) {
       
          if (Number(productCount.textContent) > 1) {
            productCount.textContent = Number(productCount.textContent) - 1;
            addToCartProducts[productName].count--;
            localStorage.setItem(
              "cartProducts",
              JSON.stringify(addToCartProducts)
            );
          } else {
            e.target.closest(".add-product").style.display = "none";
            delete addToCartProducts[productName];
            localStorage.setItem(
              "cartProducts",
              JSON.stringify(addToCartProducts)
            );
            if (
              Object.keys(JSON.parse(localStorage.getItem("cartProducts")))
                .length === 0
            ) {
              cardNoProducts.style.display = "block";
              checkoutButton.forEach((button) => {
                button.style.display = "none";
              });
            }
          }
        }
      });
    }
  }
};

increaseOrDecreaseProductFromCartPage();
