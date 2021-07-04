import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    AuthComponent,
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
