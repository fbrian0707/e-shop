import { ShoppingCart } from '../../../shared/models/cart';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit , OnDestroy {
  shipping: Shipping = {
     name: null,
    addressLine1: null,
    addressLine2: null,
    city: null };
  userSubscription: Subscription;
  userId: string;
  userName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') cart: ShoppingCart;

  constructor(
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user => {this.userId = user.uid; this.userName = user.displayName; });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    const order = new Order(this.userId, this.userName , this.shipping , this.cart);
   const result = await this.orderService.placeOrder(order);

   this.router.navigate(['/order-success', result.key]);
  }

}


export class Shipping {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
}

