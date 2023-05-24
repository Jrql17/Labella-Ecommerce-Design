if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready() {  
    const products = [
        {
            name:'LipStick',
            tag: 'lipstickitem',
            price:'₱75.00',
            imgSrc:'images/product-1.png'
        },
        {
            name:'Lip Balm',
            tag:'lipbalm',
            price:'₱80.00',
            imgSrc:'images/product-2.png'
        },
        {
            name:'Eyebrow Brush',
            tag:'eyebrowbrush',
            price:'₱150.00',
            imgSrc:'images/product-3.png'
        },
        {
            name:'Makeup Brush',
            tag:'makeupbrush',
            price:'₱55.00',
            imgSrc:'images/product-4.png'
        },
        {
            name:'Lip Balm (Cherry)',
            tag:'lipbalmcherry',
            price:'₱85.00',
            imgSrc:'images/product-5.png'
        },
        {
            name:'Lip Tint (Velor Brown)',
            tag:'liptinvelorbrown',
            price:'₱95.00',
            imgSrc:'images/product-6.png'
        },
        {
            name:'Tasty Brown Balm',
            tag:'tastybrown',
            price:'₱45.00',
            imgSrc:'images/product-7.png'
        },
        {
            name:'Concealer Brush',
            tag:'concealerbrush',
            price:'₱60.00',
            imgSrc:'images/product-8.png'
        },
        {
            name:'Contour Premium Labella Set',
            tag:'contourlabella',
            price:'₱399.00',
            imgSrc:'images/product-9.png'
        },
        {
            name:'Powder Brush',
            tag:'powderbrush',
            price:'₱110.00',
            imgSrc:'images/product-10.png'
        },
        {
            name:'Labella Pink Brush',
            tag:'labellapinkbrush',
            price:'₱165.00',
            imgSrc:'images/product-11.png'
        },
        {
            name:'Labella Dual Brush',
            tag:'labelladualbrush',
            price:'₱155.00',
            imgSrc:'images/product-12.png'
        },
		{
            name:'20g Round Tin Can',
            tag:'20gcan',
            price:'₱8.00',
            imgSrc:'images/b1.png'
        },
			
    ]

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)   
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addCartItemButtons = document.querySelectorAll('.shop-item-button')
        console.log(addCartItemButtons)
        for (let i = 0; i < addCartItemButtons.length; i++){
            var button = addCartItemButtons[i]
            button.addEventListener('click', () => {
                addToCartClicked(products[i]);
                totalCost(products[i])
        })
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(product){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    alert ('The item has been added in the cart! ')
    if (cartItems != null){

        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
    }else {
        cartItems = {
            [product.tag]:product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
    updateCartTotal()
}



function addItemToCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)

    Object.values(cartItems).map(item => {
        let title = item.name
        let price = item.price
        let image = item.imgSrc
        
        let cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        let productContainer = document.getElementsByClassName('cart-items')[0]
        let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents
        productContainer.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    })
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')


    if (cartCost != null){
        cartCost = parseFloat(cartCost.replace('₱', ' '))
        localStorage.setItem("totalCost", cartCost + parseFloat(product.price.replace('₱', ' ')))
    }else {
        localStorage.setItem("totalCost", parseFloat(product.price.replace('₱', ' ')))
    }

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₱', ''))
        var quantity = quantityElement.value
        console.log(price, quantity)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total
}
addItemToCart()
updateCartTotal()


