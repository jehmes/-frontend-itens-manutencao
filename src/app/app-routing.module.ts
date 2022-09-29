import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CreateProductComponent } from './views/product/crud/create-product/create-product.component';
import { HomeProductComponent } from './views/product/crud/home-product/home-product.component';

const routes: Routes = [{
  path: "", component: HomeComponent, children:[]
}, {
  path: "product", component: HomeProductComponent
}, {
  path: "product/create", component: CreateProductComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
