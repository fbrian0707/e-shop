import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(x) {
    return this.db.list('/products').push(x);
  }

  getAll() {
    return this.db.object('/products').snapshotChanges().map(action => action.payload.toJSON( ));
  }

  getProds() {
    return this.db.list('/products').valueChanges();
  }

  getProd(ProductId) {
    return this.db.object('/products/' + ProductId ).valueChanges();
  }

  updateProd(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProd(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
