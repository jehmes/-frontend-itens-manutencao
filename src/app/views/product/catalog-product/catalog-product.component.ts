import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {

  allproducts: Product[] = [];

  constructor(private service: ServiceProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((data) => {
      this.allproducts = data;
      console.log(data)
    })
  }

}
