let burger = document.getElementById("burger");
let userIcon = document.getElementById("userIcon");
let displayProductContainer = document.getElementById("displayProductContainer");
let categoryBox = document.querySelector(".categoryList");
let addButtons = document.querySelectorAll(".add-cart");
let saveItem = document.getElementById("saveItem");
let likeItem = document.getElementById("likeItem");
// let settingTool = document.getElementById("settingTool");
let saveCart  = JSON.parse(localStorage.getItem("saveCart"))  || [];
let saveLike  = JSON.parse(localStorage.getItem("saveLike"))  || [];
let orderCard = JSON.parse(localStorage.getItem("orderCard")) || [];
let categoryName;
let clickedItem;
let products = JSON.parse(localStorage.getItem("products")) ||[
  { name: "Organic Wheat", price: 120, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/10/chicken-biryani-restaurant-recipe.webp", category: "Food", cartItem: true, buyNow: true, like: false },
  { name: "Organic Flour", price: 90, img: "https://assets.epicurious.com/photos/569425e3cc1c03db3210e935/1:1/w_2560%2Cc_limit/Rustic-Canyon-Family-Meal-Fried-Chicken.jpg", category: "Food", cartItem: true, buyNow: true, like: false },

  { name: "Knife Set", price: 350, img: "https://images.unsplash.com/photo-1586864387789-628af9feed72", category: "Kitchen Essentials", cartItem: true, buyNow: true },

  { name: "Eco Slippers", price: 350, img: "https://images.unsplash.com/photo-1618354691438-25bc04584c23", category: "Eco Slippers", cartItem: true, buyNow: true },
  { name: "Herbal Syrup", price: 140, img: "https://m.media-amazon.com/images/I/712vd4UmtKL._AC_UF1000,1000_QL80_.jpg", category: "Medicine", cartItem: true, buyNow: true },
  { name: "Steel Spoon Set", price: 200, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c", category: "Rice" },

  { name: "Millets Mix", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2024/3/403894946/IW/SA/SH/4742771/health-mix-powder-500x500.jpg", category: "Millets", cartItem: true, buyNow: true },

  { name: "Pure Honey", price: 260, img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62", category: "Honey", cartItem: true, buyNow: true },

  { name: "Healthy Snacks", price: 120, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", category: "Snacks", cartItem: true, buyNow: true },

  { name: "Almonds", price: 600, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyU6am3SQj3sTxpojLZErOuzpbQf7FSOpDw&s", category: "Dry Fruits", cartItem: true, buyNow: true },
  { name: "Almonds", price: 600, img: "https://udupifresh.com/cdn/shop/products/WholeWheatAtta_5_750x.jpg?v=1629564833", category: "Flour", cartItem: true, buyNow: true },

];


const settingTool = document.getElementById("settingTool");
const settingList = document.getElementById("settingList");
const logoutBtn = document.getElementById("logoutBtn");

settingTool.addEventListener("click", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        // login hai → settings dikhao
        settingList.style.display =
            settingList.style.display === "block" ? "none" : "block";
    } else {
        // login nahi hai → login page
        window.location.href = "login.html";
    }
});

// logout
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});










burger.addEventListener('click', function () {
  userIcon.style.display = "block";
});

categoryBox.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".itemCategory");
  if (!clickedItem) return;
  const categoryName = clickedItem
    .querySelector(".categoryItemName")
    .innerText;
  const filteredProducts = products.filter(
    product => product.category === categoryName
  );

  displayProduct(filteredProducts);
});


function displayProduct(arr) {
  displayProductContainer.innerHTML = "";

  arr.forEach(function (item, index) {
    let id = "product-" + (index + 1);

    let buyText;
    let cartText;
    if (!item.cartItem) {
      cartText = "Cart Item";
    } else {
      cartText = "Add to Cart";
    }

    if (!item.buyNow) {
      buyText = "Already Ordered";
    } else {
      buyText = "Buy Now";
    }

    let heartColor;
    if (item.like) {
      heartColor = "red";
    } else {
      heartColor = "white";
    }


    displayProductContainer.innerHTML += `
    <div class="cart" data-index="${index}">

             <div class="img-box">
            <span class="like-icon"> <i class="fa fa-heart" style="color:${heartColor}"></i></span>
            <img src="${item.img}">
            </div>
            <div class="productDetails">
                <p class="item-name">${item.name}</p>
                <p class="item-price">
                  <span class="priceText">Price:</span> ₹${item.price}
                </p>
            </div>
            <div class="btn-group">
                <button class="add-cart">${cartText}</button>
                <button class="buy-now">${buyText}</button>
            </div>
        </div>`;

  });



  let saveItem = document.getElementById("saveItem");
  // let addButtons = document.querySelectorAll(".add-cart");

  // addButtons.forEach(button => {
  //   button.addEventListener("click", function () {

  //     let card = button.closest(".cart");
  //     let cardId = card.id;
  //     let currectText = button.innerText
  //     if (currectText === "Add to Cart") {
  //       button.innerText = "Cart Item";
  //       let index = card.dataset.index;
  //       saveCart.push(products[index]);
  //       products[index].cartItem = false;
  //       localStorage.setItem("saveCart", JSON.stringify(saveCart));
  //     } else {
  //       let index = card.dataset.index;
  //       saveCart = saveCart.filter(function (item) {
  //         return item !== products[index];
  //       });
  //       products[index].cartItem = true;
  //       localStorage.setItem("saveCart", JSON.stringify(saveCart));


  //     }
  //     // console.log(saveCart);
  //   });
  // });



  let addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    let card = button.closest(".cart");
    let index = card.dataset.index;   // ✅ SAFE
    let product = products[index];    // ✅ SAFE

    if (product.cartItem === true) {
      product.cartItem = false;
      saveCart.push(product);
      button.innerText = "Cart Item";
    } else {
      product.cartItem = true;
      saveCart = saveCart.filter(function (item) {
        return item !== product;
      });
      button.innerText = "Add to Cart";
    }

    localStorage.setItem("saveCart", JSON.stringify(saveCart));
  });
});


  saveItem.addEventListener("click", function () {
    displayProduct(saveCart);
  });




  let buyNowBtns = document.querySelectorAll(".buy-now");

  // buyNowBtns.forEach(function (buybutton) {
  //   buybutton.addEventListener("click", function () {

  //     let card = buybutton.closest(".cart");
  //     let index = card.dataset.index;

  //     if (buybutton.innerText === "Buy Now") {
  //       buybutton.innerText = "Already Ordered";
  //       products[index].buyNow = false;
  //     } else {
  //       buybutton.innerText = "Buy Now";
  //       products[index].buyNow = true;
  //     }

  //   });
  // });

  buyNowBtns.forEach(function (buybutton) {
  buybutton.addEventListener("click", function () {

    let card = buybutton.closest(".cart");
    let index = card.dataset.index;

    if (products[index].buyNow === true) {
      products[index].buyNow = false;
      orderCard.push(products[index]);
      buybutton.innerText = "Already Ordered";
    } else {
      products[index].buyNow = true;
      orderCard = orderCard.filter(function (item) {
        return item !== products[index];
      });
      buybutton.innerText = "Buy Now";
    }

    localStorage.setItem("orderCard", JSON.stringify(orderCard));
  });
});





  let likeitemList = document.querySelectorAll(".like-icon");

  // likeitemList.forEach(function (likeItem) {
  //   likeItem.addEventListener("click", function () {

  //     let card = likeItem.closest(".cart");
  //     let index = card.dataset.index;// product index
  //     let heart = likeItem.querySelector("i");

  //     if (products[index].like === false) {
  //       products[index].like = true;
  //       saveLike.push(products[index])
  //       heart.style.color = "red";
  //     } else {
  //       products[index].like = false;
  //       heart.style.color = "white";
  //       saveLike = saveLike.filter(function (item) {
  //         return item !== products[index];
  //       });
  //     }
  //     console.log(products[index]);
  //   });
  // });


  likeitemList.forEach(function (likeItem) {
  likeItem.addEventListener("click", function () {

    let card = likeItem.closest(".cart");
    let index = card.dataset.index;
    let heart = likeItem.querySelector("i");

    if (products[index].like === false) {
      products[index].like = true;
      saveLike.push(products[index]);
      heart.style.color = "red";
    } else {
      products[index].like = false;
      saveLike = saveLike.filter(function (item) {
        return item !== products[index];
      });
      heart.style.color = "white";
    }

    localStorage.setItem("saveLike", JSON.stringify(saveLike));
  });
});

};
displayProduct(products);

likeItem.addEventListener("click", function () {
  displayProduct(saveLike);

});


settingTool.addEventListener("click", function () {

});




settingTool.addEventListener("click", function (e) {
  e.stopPropagation();
  settingList.style.display =
    settingList.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function () {
  settingList.style.display = "none";
});



localStorage.getItem("isLoggedIn");













