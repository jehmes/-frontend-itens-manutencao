import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CatalogProductComponent } from './views/product/catalog-product/catalog-product.component';
import { CreateProductComponent } from './views/product/crud/create-product/create-product.component';
import { HomeProductComponent } from './views/product/crud/home-product/home-product.component';
import { ReadProductComponent } from './views/product/crud/read-product/read-product.component';
import { UpdateProductComponent } from './views/product/crud/update-product/update-product.component';

const routes: Routes = [
{ path: "", component: HomeComponent, pathMatch: "full", children: [] }, 
{ path: "product", component: HomeProductComponent}, 
{ path: "product/create", component: CreateProductComponent}, 
{ path: "product/update", component: UpdateProductComponent}, 
{ path: "product/read", component: ReadProductComponent}, 
{ path: "product/catalog-product", component: CatalogProductComponent},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
