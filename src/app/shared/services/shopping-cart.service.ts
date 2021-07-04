import { ShoppingCartItem } from '../models/cart-item';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ShoppingCart } from '../models/cart';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId)
    .valueChanges()
    .map((x: {items , dateCreated: string }) => new ShoppingCart(x.items));
    }

    async addToCart(product) {
      this.updateQuantity(product, 1);
     }

     async remove(product) {
      this.updateQuantity(product, -1);
       }

       async clearCart() {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-cart/' + cartId + '/items').remove();
       }

private create() {
  return  this.db.list('/shopping-cart').push({
  dateCreated: new Date().getTime()
  });
  }



private getItem(cartId: string , productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

private async getOrCreateCartId(): Promise<string> {
  const cartId = localStorage.getItem('cartId');
  // tslint:disable-next-line:curly
  if (cartId) return cartId;
  const result = await this.create();
  localStorage.setItem('cartId', result.key);
  return result.key;
  }

 private async updateQuantity(product, change: number) {
  const cartId = await this.getOrCreateCartId();
  const items$ = this.getItem(cartId, product.title);
  items$.valueChanges().take(1).subscribe(item => {
    const n = (item ? item.quantity : 0) + change;
    if ( n === 0 ) items$.remove();
    else
    items$.update({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: n
     });
    });
  }
}
