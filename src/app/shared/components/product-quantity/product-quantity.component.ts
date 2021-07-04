import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') cart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
   this.cartService.addToCart(this.product);
  }

  removeFromCart() {
   this.cartService.remove(this.product);
  }

}

