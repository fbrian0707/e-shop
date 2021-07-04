import { slideIn, slideUp } from './../../../shared/animations/animation';
import { ShoppingCart } from '../../../shared/models/cart';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [slideIn , slideUp]
})
export class ProductsComponent implements OnDestroy, OnInit {
  stateMain = '*';
  stateSide = 'down';
  busy = true;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: ShoppingCart;
  subcription: Subscription;

  constructor(productService: ProductService,
   private cartService: ShoppingCartService,
    route: ActivatedRoute) {
    productService
 .getProds()
 .switchMap(x => {
   this.products = this.filteredProducts  = x;
 return route.queryParamMap;
 })

    .subscribe(params => { this.category = params.get('category');
    // tslint:disable-next-line:curly
    if (!this.products) return;
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category.toLowerCase().substr(0, this.category.indexOf(' ') )) :
    this.products;
   // console.log(this.filteredProducts);
   // console.log(this.products);
  });
   }

  async ngOnInit() {
    this.busy = true;
    this.subcription =  (await this.cartService.getCart())
    .subscribe(cart => {this.cart = cart; this.stateMain = 'in'; this.stateSide = 'up'; this.busy = false; });
   }

   ngOnDestroy() {
     this.subcription.unsubscribe();
   }

}
