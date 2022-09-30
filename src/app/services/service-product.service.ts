import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {

  urlGetAll = "http://localhost:8080/product"
  urlGetById = "http://localhost:8080/product/"
  urlCreate = "http://localhost:8080/product/create"
  urlDelete = "http://localhost:8080/product/delete/"
  urlUpdate = "http://localhost:8080/product/update/"

  constructor(private http: HttpClient) { }

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
}
