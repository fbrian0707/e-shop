import { Component , Input} from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/cart';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') actions;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') cart: ShoppingCart;
  closeResult: string;
  constructor(private cartService: ShoppingCartService , private modalService: NgbModal) { }

  addToCart() {
   this.cartService.addToCart(this.product);
  }


  open(content , p) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
