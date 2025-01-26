let title = document.getElementById('title');
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;

//? ==========GetTotal===========
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = '#bd0505';
    total.innerHTML = '';
  }
}
price.addEventListener('keyup', function () {
  getTotal();
});
taxes.addEventListener('keyup', function () {
  getTotal();
});
ads.addEventListener('keyup', function () {
  getTotal();
});
discount.addEventListener('keyup', function () {
  getTotal();
});

// ?===========create product===
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  };

  if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
    if (mood === 'create') {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
    clearData();
  }

  localStorage.setItem('product', JSON.stringify(dataProduct));

  displayData();
};

// ?==================clear inputs====================
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// ?================Read=============================
function displayData() {
  let cartona = '';
  for (let i = 0; i < dataProduct.length; i++) {
    cartona += `
    <div class="card">
      <p><strong>ID:</strong> ${i + 1}</p>
      <p><strong>Title:</strong> ${dataProduct[i].title}</p>
      <p><strong>Price:</strong> ${dataProduct[i].price}</p>
      <p><strong>Taxes:</strong> ${dataProduct[i].taxes}</p>
      <p><strong>Ads:</strong> ${dataProduct[i].ads}</p>
      <p><strong>Discount:</strong> ${dataProduct[i].discount}</p>
      <p><strong>Total:</strong> ${dataProduct[i].total}</p>
      <p><strong>Category:</strong> ${dataProduct[i].category}</p>
      <div class="actions">
        <button onclick="updateData(${i})" class="update-btn">Update</button>
        <button onclick='deleteData(${i})' class="delete-btn">Delete</button>
      </div>
    </div>`;
  }

  let deleteAllBtn = document.getElementById('deleteAll');
  if (dataProduct.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick='deleteAll()' id="deleteAll">Delete All (${dataProduct.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = ``;
  }

  document.querySelector('.cards-container').innerHTML = cartona;
  getTotal();
}

// ?=================Delete All=========================
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  displayData();
}

// ?=============Delete data========================
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  displayData();
}

// ?=====================Update=========================
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  count.style.display = 'none';
  getTotal();
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth'
  });
}

// ?=====================Search==========================
let searchMood = 'title';
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');

searchTitle.addEventListener('click', function () {
  getSearchMood(this.id);
});
searchCategory.addEventListener('click', function () {
  getSearchMood(this.id);
});

function getSearchMood(id) {
  if (id == 'searchTitle') {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  search.placeholder = 'Search By ' + searchMood;
  search.focus();
  search.value = '';
  displayData();
}

function searchData(value) {
  let cartona = '';
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == 'title') {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        cartona += `
        <div class="card">
          <p><strong>ID:</strong> ${i + 1}</p>
          <p><strong>Title:</strong> ${dataProduct[i].title}</p>
          <p><strong>Price:</strong> ${dataProduct[i].price}</p>
          <p><strong>Taxes:</strong> ${dataProduct[i].taxes}</p>
          <p><strong>Ads:</strong> ${dataProduct[i].ads}</p>
          <p><strong>Discount:</strong> ${dataProduct[i].discount}</p>
          <p><strong>Total:</strong> ${dataProduct[i].total}</p>
          <p><strong>Category:</strong> ${dataProduct[i].category}</p>
          <div class="actions">
            <button onclick="updateData(${i})" class="update-btn">Update</button>
            <button onclick='deleteData(${i})' class="delete-btn">Delete</button>
          </div>
        </div>`;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        cartona += `
        <div class="card">
          <p><strong>ID:</strong> ${i + 1}</p>
          <p><strong>Title:</strong> ${dataProduct[i].title}</p>
          <p><strong>Price:</strong> ${dataProduct[i].price}</p>
          <p><strong>Taxes:</strong> ${dataProduct[i].taxes}</p>
          <p><strong>Ads:</strong> ${dataProduct[i].ads}</p>
          <p><strong>Discount:</strong> ${dataProduct[i].discount}</p>
          <p><strong>Total:</strong> ${dataProduct[i].total}</p>
          <p><strong>Category:</strong> ${dataProduct[i].category}</p>
          <div class="actions">
            <button onclick="updateData(${i})" class="update-btn">Update</button>
            <button onclick='deleteData(${i})' class="delete-btn">Delete</button>
          </div>
        </div>`;
      }
    }
  }
  document.querySelector('.cards-container').innerHTML = cartona;
}

displayData();
