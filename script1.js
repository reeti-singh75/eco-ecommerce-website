/* ================= DOM ================= */
const burger = document.getElementById("burger");
const userIcon = document.getElementById("userIcon");
const displayProductContainer = document.getElementById("displayProductContainer");
const categoryBox = document.querySelector(".categoryList");
const saveItem = document.getElementById("saveItem");
const likeItem = document.getElementById("likeItem");
const settingTool = document.getElementById("settingTool");
const settingList = document.getElementById("settingList");
const logoutBtn = document.getElementById("logoutBtn");
const orderList = document.getElementById("myOrders");
const profileBtn = document.getElementById("profile");
const profilePage = document.getElementById("profilePage");
const backBtn = document.getElementById("backBtn");

/* =============== PRODUCTS =============== */
let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Organic Wheat", price: 120, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/10/chicken-biryani-restaurant-recipe.webp", category: "Food", cartItem: false, buyNow: false, like: false },
    { id: 2, name: "Organic Flour", price: 90, img: "https://assets.epicurious.com/photos/569425e3cc1c03db3210e935/1:1/w_2560%2Cc_limit/Rustic-Canyon-Family-Meal-Fried-Chicken.jpg", category: "Food", cartItem: false, buyNow: false, like: false },
    { id: 3, name: "Knife Set", price: 350, img: "https://images.unsplash.com/photo-1586864387789-628af9feed72", category: "Kitchen Essentials", cartItem: false, buyNow: false, like: false },
    { id: 4, name: "Eco Slippers", price: 350, img: "https://images.unsplash.com/photo-1618354691438-25bc04584c23", category: "Eco Slippers", cartItem: false, buyNow: false, like: false },
    { id: 5, name: "Herbal Syrup", price: 140, img: "https://m.media-amazon.com/images/I/712vd4UmtKL._AC_UF1000,1000_QL80_.jpg", category: "Medicine", cartItem: false, buyNow: false, like: false },
    { id: 6, name: "Steel Spoon Set", price: 200, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c", category: "Rice", cartItem: false, buyNow: false, like: false },
    { id: 7, name: "Millets Mix", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2024/3/403894946/IW/SA/SH/4742771/health-mix-powder-500x500.jpg", category: "Millets", cartItem: false, buyNow: false, like: false },
    { id: 8, name: "Pure Honey", price: 260, img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62", category: "Honey", cartItem: false, buyNow: false, like: false },
    { id: 9, name: "Healthy Snacks", price: 120, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", category: "Snacks", cartItem: false, buyNow: false, like: false },
    { id: 10, name: "Almonds", price: 600, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyU6am3SQj3sTxpojLZErOuzpbQf7FSOpDw&s", category: "Dry Fruits", cartItem: false, buyNow: false, like: false },
    { id: 11, name: "Almonds", price: 600, img: "https://udupifresh.com/cdn/shop/products/WholeWheatAtta_5_750x.jpg?v=1629564833", category: "Flour", cartItem: false, buyNow: false, like: false },
];


let saveCart = JSON.parse(localStorage.getItem("saveCart")) || [];
let orderCard = JSON.parse(localStorage.getItem("orderCard")) || [];




 
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProduct(arr) {
    displayProductContainer.innerHTML = "";

    arr.forEach(item => {
        displayProductContainer.innerHTML += `
      <div class="cart" data-id="${item.id}">
        <div class="img-box">
          <span class="like-icon">
            <i class="fa fa-heart" style="color:${item.like ? "red" : "white"}"></i>
          </span>
          <img src="${item.img}">
        </div>

      <div class="productDetails">
                <p class="item-name">${item.name}</p>
                <p class="item-price">
                  <span class="priceText">Price:</span> ₹${item.price}
                </p>
            </div>
   <div class="btn-group">
        <button class="add-cart">
          ${!item.cartItem ? "Add to Cart" : "Cart Item"}
        </button>

        <button class="buy-now">
          ${!item.buyNow ? "Buy Now" : "Already Ordered"}
        </button>
        </div>
      </div>
    `;
    });

    attachEvents();
}

 
function attachEvents() {
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.onclick = () => {
      const id = btn.closest(".cart").dataset.id;
      const product = products.find(p => p.id == id);

      if (product.cartItem === false) {
        product.cartItem = true;
        saveCart.push(product);
        btn.innerText = "Cart Item";
      } else {
        product.cartItem = false;
        saveCart = saveCart.filter(item => item.id !== product.id);
        btn.innerText = "Add to Cart";
      }

      localStorage.setItem("saveCart", JSON.stringify(saveCart));
      saveProducts();
    };
  });
 
  document.querySelectorAll(".buy-now").forEach(btn => {
    btn.onclick = () => {
      const id = btn.closest(".cart").dataset.id;
      const product = products.find(p => p.id == id);

      if (product.buyNow === false) {
        product.buyNow = true;
        orderCard.push(product);
        btn.innerText = "Already Ordered";
      } else {
        product.buyNow = false;
        orderCard = orderCard.filter(item => item.id !== product.id);
        btn.innerText = "Buy Now";
      }

      localStorage.setItem("orderCard", JSON.stringify(orderCard));
      saveProducts();
    };
  });

   
  document.querySelectorAll(".like-icon").forEach(icon => {
    icon.onclick = () => {
      const id = icon.closest(".cart").dataset.id;
      const product = products.find(p => p.id == id);

      product.like = !product.like;
      saveProducts();
      displayProduct(products);
    };
  });
}

 
saveItem.addEventListener("click", () => {
    displayProduct(products.filter(p => p.cartItem));
});

likeItem.addEventListener("click", () => {
    displayProduct(products.filter(p => p.like));
});


orderList.addEventListener("click", () => {
    displayProduct(products.filter(p => p.buyNow));
});


categoryBox.addEventListener("click", e => {
    const item = e.target.closest(".itemCategory");
    if (!item) return;

    const name = item.querySelector(".categoryItemName").innerText;
    displayProduct(products.filter(p => p.category === name));
});
 
burger.addEventListener("click", () => {
    userIcon.style.display = "block";
});



document.addEventListener("click", () => {
    settingList.style.display = "none";
});
 
displayProduct(products);




settingTool.addEventListener("click", function (e) {
  e.stopPropagation();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    settingList.style.display =
      settingList.style.display === "block" ? "none" : "block";
  } else {
    window.location.href = "login.html";
  }
});


logoutBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});


document.addEventListener("click", function () {
  settingList.style.display = "none";
});


profileBtn.addEventListener("click", function () {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (!user) return;
  displayProductContainer.style.display = "none";
  profilePage.style.display = "block";
  document.getElementById("pName").innerText = user.name;
  document.getElementById("pEmail").innerText = user.email;
  document.getElementById("pPhone").innerText = user.phone;
  document.getElementById("pPassword").innerText = user.password;
  document.getElementById("pPassword").innerText = "******";
});

 


backBtn.addEventListener("click", function () {
  profilePage.style.display = "none";
  displayProductContainer.style.display = "block";
});


const togglePass = document.getElementById("togglePass");
let passVisible = false;

togglePass.addEventListener("click", function () {
  const passSpan = document.getElementById("pPassword");

  if (passVisible) {
    passSpan.innerText = "******";
    togglePass.innerText = "Show";
  } else {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    passSpan.innerText = user.password;
    togglePass.innerText = "Hide";
  }

  passVisible = !passVisible;
});



// #themeToggle{
//   background: transparent;
//   border: none;
//   font-size: 20px;
//   color: #fff; /* dark background me white */
//   cursor: pointer;
// }



const themeToggle = document.getElementById("themeToggle");

 
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark-theme");
  themeToggle.classList.replace("fa-moon","fa-sun");
}
 
themeToggle.addEventListener("click", function(){
  document.body.classList.toggle("dark-theme");

  if(document.body.classList.contains("dark-theme")){
    localStorage.setItem("theme","dark");
    themeToggle.classList.replace("fa-moon","fa-sun");
  }else{
    localStorage.setItem("theme","light");
    themeToggle.classList.replace("fa-sun","fa-moon");
  }
});




const micBtn = document.getElementById('micBtn');
const searchText = document.getElementById('searchText');
// const transcript = document.getElementById('transcript');

let recognition;
let isRecording = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = function(event) {
        const speechToText = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        // transcript.textContent = speechToText;
        searchText.value = speechToText;
    };

    recognition.onend = function() {
        micBtn.classList.remove('active');
        isRecording = false;
    };
} else {
    alert('Your browser does not support Speech Recognition.');
}

micBtn.addEventListener('click', () => {
    if (!isRecording) {
        recognition.start();
        isRecording = true;
        micBtn.classList.add('active');
    } else {
        recognition.stop();
        isRecording = false;
        micBtn.classList.remove('active');
    }
});



let searchInput = document.getElementById("searchText");
let displayContainer = document.getElementById("displayProductContainer");
function displayProducts(list) {
    displayContainer.innerHTML = ""; 
    if(list.length === 0){
        displayContainer.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>No products found</p>";
        return;
    }
    list.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("cart");  
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="productDetails">
                <p class="item-name">${item.name}</p>
                <p class="item-price"><span class="priceText">Price:</span> ₹${item.price}</p>
            </div>
            <div class="btn-group">
                <button class="add-cart">Add to Cart</button>
                <button class="buy-now">Buy Now</button>
            </div>
        `;
        displayContainer.appendChild(div);
    });
}

 
displayProducts(products);
searchInput.addEventListener("input", () => {
    let query = searchInput.value.toLowerCase();
    let filtered = products.filter(item => item.name.toLowerCase().includes(query));
    displayProducts(filtered);
});
 
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let query = searchInput.value.toLowerCase();
        let exactMatch = products.filter(item => item.name.toLowerCase() === query);
        displayProducts(exactMatch);
    }
});