if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
    var rmItemCart = document.getElementsByClassName('btn-delete')
    console.log(rmItemCart);
    for (let i = 0; i < rmItemCart.length; i++) {
        var myBtn = rmItemCart[i]
        myBtn.addEventListener('click', removeCardItems)
    }
    var qttInput = document.getElementsByClassName('qtt')
    for (let i = 0; i < qttInput.length; i++) {
        var input = qttInput[i]
        input.addEventListener('change', qttChanged)
    }
    var addToCart = document.getElementsByClassName('overlay')
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('orderBtn')[0].addEventListener('click', orderClicked)

}

function orderClicked(){
    alert('Your order is being processed, Thank You')
    var allCartItems = document.getElementsByClassName('container')
    // while (allCartItems.has)
}

function removeCardItems(event) {
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.parentElement.remove()
    updateCardTotal()
} 
function qttChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCardTotal()
}

// add item to cart
function addToCartClicked(event) {
    var button = event.target
    var card = button.parentElement.parentElement
    var dishImg = card.getElementsByClassName('dishImg')[0].src
    var cardContent = card.getElementsByClassName('desc')[0]
    var dishName = cardContent.getElementsByClassName('dishName')[0].innerText
    var dishPrice = cardContent.getElementsByClassName('price')[0].innerText
    addItemToCart(dishImg, dishName, dishPrice)
    updateCardTotal()
}
function addItemToCart(dishImg, dishName, dishPrice) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('smallCard')
    var cardContainer = document.getElementsByClassName('cardContainer')[0]
    var cartItemNames = cardContainer.getElementsByClassName('dishName')
    
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == dishName) {
            alert(dishName + ' is already in the order')
            return
        }
    }
    var cartCardContent = `
        <div class="avatar">
            <img src="${dishImg}" alt="">
        </div>
        <div class="details">
            <p>${dishName}</p>
            <form>
                <label for="quantity">X</label>
                <input class="qtt" type="number" value="1" name="quantity" min="1" max="10">
            </form>
        </div>
        <div class="cost">
            <p class="price">${dishPrice}</p>
            <button class="btn-delete" type="button"><i class="fa fa-trash-o" aria-hidden="true"></i> <span> remove</span></button>                                    
        </div>
    `
    cartRow.innerHTML = cartCardContent
    cardContainer.append(cartRow)
    cartRow.getElementsByClassName('btn-delete')[0].addEventListener('click', removeCardItems)
    cartRow.getElementsByClassName('qtt')[0].addEventListener('change', qttChanged)
}

function updateCardTotal() {
    var cardCont = document.getElementsByClassName('cardContainer')[0]
    var card = cardCont.getElementsByClassName('smallCard')
    var total = 0
    for (let i = 0; i < card.length; i++) {
        var mycard = card[i]
        var itemPrice = mycard.getElementsByClassName('price')[0]
        var itemQtt = mycard.getElementsByClassName('qtt')[0]
        var price = parseFloat(itemPrice.innerText.replace('Ksh ', ''))
        var quantity = itemQtt.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('totalCost')[0].innerText = 'Ksh ' + total
}