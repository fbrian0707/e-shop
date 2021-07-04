import { ShoppingCartItem  } from './cart-item';

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: {[key: string]: ShoppingCartItem } ) {
    this.itemsMap = itemsMap || {} ;
    // tslint:disable-next-line:forin
    for (const id in itemsMap) {
      const item = itemsMap[id] ;
      this.items.push(new ShoppingCartItem({...item, key: id }));
    }
  }

  /*
  get productIds() {
    return Object.keys(this.items);
  }
  */
  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (const id in this.items) {
      sum += this.items[id].totalPrice;
    }
    return sum;
  }

  get totalItemsCount(): number {
    let count = 0;
    // tslint:disable-next-line:forin
     // tslint:disable-next-line:curly
     for ( const productTitle in this.items)
     count += this.items[productTitle].quantity;
     return count;
  }

 public getQuantity(product) {
    const item = this.itemsMap[product.title];
    return item ? item.quantity : 0;
  }
}
