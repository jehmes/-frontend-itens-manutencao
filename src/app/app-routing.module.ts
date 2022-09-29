import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CrudProductComponent } from './views/product/crud-product/crud-product.component';

const routes: Routes = [{
  path: "", component: HomeComponent
}, {
  path: "product", component: CrudProductComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
