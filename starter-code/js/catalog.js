/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);


// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //[DONE] --- TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');

  for (var i of Product.allProducts) {
    var el = document.createElement("option");
    var option = i.name;

    el.textContent = option;
    selectElement.appendChild(el);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // [DONE] TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart(event); //[DONE]
  cart.saveToLocalStorage(); //[DONE]
  updateCounter(); //[DONE]
  updateCartPreview();

}

// [DONE] TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(e) {
  // [DONE] TODO: suss out the item picked from the select list
  console.log(e.target.items.value);
  console.log(e.target.quantity.value);
  // [DONE] TODO: get the quantity
  // [DONE] TODO: using those, add one item to the Cart
  cart.addItem(e.target.items.value, parseInt(e.target.quantity.value));
}

// [DONE] TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var header = document.getElementById('itemCount');
  var cartTotal = 0;

  for(var i = 0; i < cart.items.length; i++){
    cartTotal = cartTotal + cart.items[i].quantity;
  }

  header.textContent = cartTotal;
}
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
