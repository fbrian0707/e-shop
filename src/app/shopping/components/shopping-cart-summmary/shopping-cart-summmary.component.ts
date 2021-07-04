import { ShoppingCart } from '../../../shared/models/cart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summmary.component.html',
  styleUrls: ['./shopping-cart-summmary.component.css']
})
export class ShoppingCartSummaryComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') cart: ShoppingCart;

  constructor() {
  }


}
