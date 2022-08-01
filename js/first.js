// 1-Event   2-elemint   3-action


var productNameInput = document.getElementById("productNameInput"); //Input klo
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
let tableBody=document.getElementById("tableBody");

var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");

var productList;

function validProductName() {
    var regex = /^[A-Z][a-z]{2,8}$/;
    if (regex.test(productNameInput.value) == true) {
        productNameAlert.classList.replace("d-block", "d-none");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
    }
    else {
        productNameAlert.classList.replace("d-none", "d-block");
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.add("is-invalid");
    }
}
productNameInput.addEventListener("keyup", validProductName);

/* 100-10000
50-99
100-999
1000-9999
10000
*/
function validProductPrice() {
    var regex = /^([5-9][0-9]|[1-9][0-9]{2}|[1-9][0-9]{3}|10000)$/;
    if (regex.test(productPriceInput.value) == true) {
        productPriceAlert.classList.replace("d-block", "d-none");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");

    } else {
        productPriceAlert.classList.replace("d-none", "d-block");

        productPriceInput.classList.remove("is-valid");
        productPriceInput.classList.add("is-invalid");
    }
}
productPriceInput.addEventListener("keyup", validProductPrice);






if (localStorage.getItem("ourProducts") == null) //client gdid//maloo4 7aga
{
    productList = [];
} else //leh data mawgoda abl kdaaa
{
    productList = JSON.parse(localStorage.getItem("ourProducts"));
    displayProducts(productList);
}

//2M

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productList.push(product); //1
    localStorage.setItem("ourProducts", JSON.stringify(productList));
    displayProducts(productList);
    clearForm();
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
    productCategoryInput.value = "";

}

function displayProducts(anyArray) {
    var cartoona = "";
    for (var i = 0; i < anyArray.length; i++) //2
    {
        cartoona += `<tr>
                                <td>${i}</td>
                                <td>${anyArray[i].name}</td>
                                <td>${anyArray[i].price}</td>
                                <td>${anyArray[i].category}</td>
                                <td>${anyArray[i].desc}</td>
                                <td><button class="btn btn-warning">update</button></td>
                                <td><button onclick="deleteProduct(${i})"  class="btn btn-danger">delete</button></td>
                    </tr>`;
    }
    tableBody.innerHTML = cartoona;
}



function deleteProduct(index) {

    productList.splice(index, 1);
    localStorage.setItem("ourProducts", JSON.stringify(productList));
    displayProducts(productList);
}


var searchInput = document.getElementById("searchInput");

function searchProducts() {
    var searchTerm = searchInput.value;
    var wantedProducts = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            wantedProducts.push(productList[i]);
        }
    }
    displayProducts(wantedProducts);
}