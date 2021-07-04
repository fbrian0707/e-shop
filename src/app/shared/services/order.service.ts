import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase , private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const promise = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return promise;
  }

  getOrders() {
   return this.db.list('/orders').valueChanges();
  }

  getMyOrders(userId: string) {
    return this.db.list('/orders', ref => ref
    .orderByChild('userId')
    .equalTo(userId)).valueChanges();
  }
}
