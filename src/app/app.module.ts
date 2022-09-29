import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { CreateProductComponent } from './views/product/crud/create-product/create-product.component';
import { UpdateProductComponent } from './views/product/crud/update-product/update-product.component';
import { ReadProductComponent } from './views/product/crud/read-product/read-product.component';
import { HomeProductComponent } from './views/product/crud/home-product/home-product.component';
import { CatalogProductComponent } from './views/product/catalog-product/catalog-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ReadProductComponent,
    HomeProductComponent,
    CatalogProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
