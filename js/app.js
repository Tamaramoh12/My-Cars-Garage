'use strict';

//array to store all objects
var allCars = [];

//check if there are data in local storage, and if yes we will get it
if(localStorage.getItem('All Cars')){
    var localStorageData =  JSON.parse(localStorage.getItem('All Cars'));
    for(var i = 0; i < localStorageData.length; i++){
        new Car(localStorageData[i].model , localStorageData[i].year , localStorageData[i].price , localStorageData[i].manufacturer);
    }
}

//constructor
function Car(model , year , price , manufacturer){
    this.model = model;
    this.year = year;
    this.price = getRandomNumber(7000,100000);
    this.manufacturer = manufacturer;
    allCars.push(this);
}

//method to calculate the price --- Random number
function getRandomNumber(max,min){
    var random = Math.random();
    random = (random * (max - min + 1)) + min;
    random = Math.floor(random);
    return random;
}

//Dealing with the form 
//Targeting the form
var form = document.getElementById('carsForm');
//Add event listner
form.addEventListener('submit',addNewCar);
//function to execute whenever we click submit
function addNewCar(event){
    event.preventDefault();

    //getting the data from fiels
    var model = event.target.model.value;
    var year = event.target.year.value;
    // var manufacturer = event.target.manufacturer.value;
    var manufacturer = document.getElementById('manufacturer');
    var selectedOption =  manufacturer.options[manufacturer.selectedIndex].text;
    //create new object from the form data
    var carObj = new Car (model , year , 0 , selectedOption); 
    carObj.render();
    allPrices();
    //Set to local storage
    localStorage.setItem('All Cars', JSON.stringify(allCars));
}

//Dealing with the table
//Targeting the table
var table = document.getElementById('carsTable');
//Table header 
function tableHeader(){
    var headerContent = ['Car Model' , 'Model Year' , 'Price' ,'Manufacturer'];

    var headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    for(var i = 0; i < headerContent.length; i++){
        var column = document.createElement('th');
        column.textContent = headerContent[i];
        headerRow.appendChild(column);
    }
}
tableHeader();

//Table content
Car.prototype.render = function (){
    var row = document.createElement('tr');
    table.appendChild(row);

    var cell1 = document.createElement('td');
    cell1.textContent = this.model;
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.textContent = this.year;
    row.appendChild(cell2);

    var cell3 = document.createElement('td');
    cell3.textContent = this.price;
    row.appendChild(cell3);

    var cell4 = document.createElement('td');
    cell4.textContent = this.manufacturer;
    row.appendChild(cell4);
}

//Cunction to calculate all prices
function allPrices(){
    var total = 0;
    for(var i = 0; i < allCars.length; i++){
        total += allCars[i].price;
    }
    var p = document.getElementById('prices');
    p.textContent = 'Total Price = ' + total;
}

//function to display the data from localStorage
function displayData(){
    for(var i = 0; i < allCars.length; i++){
        allCars[i].render();
        allPrices();
    }
}
allPrices();
displayData();