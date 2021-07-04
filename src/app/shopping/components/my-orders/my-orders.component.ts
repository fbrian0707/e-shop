import { AngularFireAuth } from 'angularfire2/auth';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
   this.authService.user$.subscribe(x => {
    this.orders$ = this.orderService.getMyOrders(x.uid);
   });
  }

}
