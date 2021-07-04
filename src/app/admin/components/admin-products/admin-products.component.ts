import { ProductService } from '../../../shared/services/product.service';
import { Component , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  constructor(private prod: ProductService) {
    this.subscription = this.prod.getAll().subscribe(x => {
      Object.keys(x).map(key => {
        this.products.push({'key': key, 'data': x[key] });
      });
      this.filteredProducts = this.products;
      console.log(this.filteredProducts);
    });
  }

  filter(x: string) {
    this.filteredProducts = (x) ?
    this.products.filter(p => p.data.title.toLowerCase().includes(x.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
