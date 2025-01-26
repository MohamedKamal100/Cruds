let title = document.getElementById('title')
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")


//? ==========GetTotal===========
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.background = "#040"
  } else {
    total.style.background = '#bd0505'
    total.innerHTML = ''
  }
}
price.addEventListener('keyup', function (e) {
  getTotal()
})
taxes.addEventListener('keyup', function (e) {
  getTotal()
})
ads.addEventListener('keyup', function (e) {
  getTotal()
})
discount.addEventListener('keyup', function (e) {
  getTotal()
})

// ?===========create product===
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product)
}
else {
  dataProduct = []
}


submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,

  }
  dataProduct.push(newProduct)
  localStorage.setItem('product', JSON.stringify(dataProduct))
  console.log(dataProduct)
}
// ?========================================