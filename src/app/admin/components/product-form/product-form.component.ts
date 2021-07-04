import { Router , ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {
    title: null,
    price: null,
    category: null,
    imageUrl: null
  };
  id: string;
  constructor(private cat: CategoryService,
     private productService: ProductService ,
     private route: ActivatedRoute,
     private router: Router) {
     this.categories$ = cat.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProd(this.id).take(1).subscribe((x: Product) => this.product = x);
    }
   }

  ngOnInit() {
  }

  save(x) {
    if (this.id) { this.productService.updateProd(this.id, x); }
    // tslint:disable-next-line:one-line
    else {this.productService.create(x); }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    // tslint:disable-next-line:curly
    if (!confirm('Are u sure you want to selete this product?')) return;
      this.productService.deleteProd(this.id);
      this.router.navigate(['/admin/products']);
  }

}

export class Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
