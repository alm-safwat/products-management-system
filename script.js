let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood =  "create";
let tmp;

// calculate the total price
function calcTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040"  
    } else{
        total.innerHTML = '';
        total.style.background = "#f22"  
    }
}
// add and create product
// save to local storage
// clean data inputs

let productData;
if (localStorage.product != null){
    productData = JSON.parse(localStorage.product)
}else{
    productData = [];
}


submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' 
    && price.value != '' 
    && category.value != ''
    && count.value <= 100 ){
        if (mood === "create"){
            if(newProduct.count > 1){
                for (let i=0; i<newProduct.count; i++){
                    productData.push(newProduct);
                }
            }else{
                productData.push(newProduct);
            }
        }else{
            productData[tmp] = newProduct;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }
localStorage.setItem('product', JSON.stringify(productData))
showData();
}

// clear the inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read and show products
function showData(){
    let table = '';
    for (let i=0; i < productData.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button id='update' onclick="updateData(${i})">Update</button></td>
            <td><button id='delete' onclick="deleteProduct(${i})" >Delete</button></td>
        </tr>
        `
        calcTotal();
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteBtn = document.getElementById('deleteAll');
    if(productData.length > 0){
        deleteBtn.innerHTML = `
        <button onclick="deleteAll()">Delete All (${productData.length})</button>
        `
    }else{
        deleteBtn.innerHTML =""
    }

}
showData();

// delete 
function deleteProduct(i){
    productData.splice(i,1);
    localStorage.product = JSON.stringify(productData);
    showData();
}

function deleteAll(){
    productData.splice(0)
    localStorage.clear()
    showData();
}

// bulk or count addition
// update and edit


function updateData(i){
    title.value = productData[i].title;
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    discount.value = productData[i].discount;
    calcTotal();
    count.style.display = 'none';
    category.value = productData[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search

let searchMood = 'title';

function setSearchMood (id){
    let search = document.getElementById('search');
    if (id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus();
search.value = '';
showData();
}


function searchProduct(value){
    let table = '';
    for(let i=0; i < productData.length; i++){
        if(searchMood == 'title'){
            if(productData[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id='update' onclick="updateData(${i})">Update</button></td>
                    <td><button id='delete' onclick="deleteProduct(${i})" >Delete</button></td>
                </tr>
                `;
            }
        }else{
            if(productData[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id='update' onclick="updateData(${i})">Update</button></td>
                    <td><button id='delete' onclick="deleteProduct(${i})" >Delete</button></td>
                </tr>
                `;
            }
            
        }
    }

document.getElementById('tbody').innerHTML = table;
}


