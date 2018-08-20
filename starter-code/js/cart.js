/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
//this needs to select a delete button that goes into the cart and then removes the item
//that is associated with the cart item locaiton.
// if all the items are in a table with radio button to select, the delete button can remove the item(s) selected
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  // this line is seeting cartiems as to the same value of localStorage.cart which is an (Array???)
  // or if its empty it sets var cartItems as an empty Array
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  //cart variable set on line(10) gets assigned the instance of Cart with the internal properties of cartItems --which is an Array
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart(); //[DONE]
  clearCart(); //[DONE]
  showCart(); //[DONE]
}

// [DONE] TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableRows = document.querySelectorAll('#cart tbody tr');

  for (var i = 0; i <= tableRows.length; i++) {
    if (tableRows[i]) {
      tableRows[i].remove();
    }
  }
}

// [DONE] TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // [DONE] TODO: Find the table body --- pulling in the first index of tbody
  var tableBody = document.querySelector('#cart tbody');


  // [DONE] TODO: Iterate over the items in the cart
  for(var i in cart.items){
    //[DONE] TODO: Create a TR
    var cartItemRow = document.createElement('tr'); // creating a tr	within tbody
    // [DONE] TODO: Create a TD for the delete link, quantity,  and the item

    //[DONE] delete link td - this should be pulling in the delete button already created
    var deleteLink = document.createElement('td'); // creating a td within the tr
    deleteLink.textContent = 'X';
    deleteLink.classList.add('remover');
    deleteLink.id = i;

    //quantity td - this should be pulling in the
    var quanityOfItem = document.createElement('td'); // creating a td within the tr
    quanityOfItem.textContent = cart.items[i].quantity;

    //item td -- which should be the img pathway to display the image
    var itemPathWay = document.createElement('td'); // creating a tdwithin the tr that has the remove

    itemPathWay.textContent = cart.items[i].product;

    cartItemRow.appendChild(deleteLink);
    cartItemRow.appendChild(quanityOfItem);
    cartItemRow.appendChild(itemPathWay);

    // [DONE] TODO: Add the TR to the TBODY and each of the TD's to the TR
    tableBody.appendChild(cartItemRow);
  }
}

function removeItemFromCart(event) {
  // [DONE] TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (event.target.classList.contains('remover')) {
    // [DONE] Remove that item from the cart, based on the ID we set when we created the button.
    cart.removeItem(parseInt(event.target.id));
    // [DONE] Save the cart back to local storage.
    cart.saveToLocalStorage();
    // [DONE] TODO: Re-draw the cart table
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
