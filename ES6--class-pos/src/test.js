class cartItem {
    constructor(item,count= 1){
        this.item = item;
        this.count = count ;
    }

    getBarcode(){
        return this.item.barcode;
    }

    getName(){
        return this.item.name;
    }

    getPrice (){
        return this.item.price;
    }

    getUnit(){
        return this.item.unit;
    }

    static buildCartItem(tags , allItem){
       let cartItems = [];
        tags.map(tag => {
            let tagArray = tag.split("-");
            let barcode = tagArray[0];
            let count = tagArray[1];
            let cartItem = cartItems.find(cartItem => {cartItem.getBarcode = barocde});
            if(cartItem){
                cartItem.count += count;
            }else{
                const item = allItem.find(item => item.Barcode === barcode)
                cartItems.push(new CartItem(item,count))
            }
        });
        return cartItems
    }
}

module.exports = CartItems;