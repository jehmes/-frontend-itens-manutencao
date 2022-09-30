import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductFilter } from '../models/ProductFilter';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {

  urlGetAll = "http://localhost:8080/product";
  urlGetByFilter = "http://localhost:8080/product/filter?";
  urlGetById = "http://localhost:8080/product/";
  urlCreate = "http://localhost:8080/product/create";
  urlDelete = "http://localhost:8080/product/delete/";
  urlUpdate = "http://localhost:8080/product/update/";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.urlCreate, product)
  }
  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlGetAll)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.urlGetById}${id}`)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(`${this.urlDelete}${id}`)
  }

  updateProduct(product: Product, id: number): Observable<Product> {
    return this.http.post<any>(`${this.urlUpdate}${id}`, product)
  }

  getProductsByFilter(product: ProductFilter): Observable<Product[]> {
    let newUrl = this.urlGetAll;

    if (product.name !== null || product.quantity !== null || product.defective !== null || product.moneyValue !== null) {
      newUrl = this.urlGetByFilter;
      
      if(product.name !== null)
      newUrl += `name=${product.name}&`;

      if(product.quantity !== null)
      newUrl += `quantity=${product.quantity}&`;

      if(product.defective !== null)
      newUrl += `defective=${product.defective}&`;

      if(product.moneyValue !== null)
      newUrl += `moneyValue=${product.moneyValue}&`;

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.get<Product[]>(newUrl)
  }

  showMessage(msg: string, color: string) {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color],
    })
  }
}
