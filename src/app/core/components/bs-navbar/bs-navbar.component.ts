import { ShoppingCart } from '../../../shared/models/cart';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../../../shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import 'rxjs/add/operator/map';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(public auth: AuthService, private cartService: ShoppingCartService) {
  }

async ngOnInit() {
   this.auth.appUser$.subscribe(x => this.appUser = x);
   this.cart$  = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }


}
