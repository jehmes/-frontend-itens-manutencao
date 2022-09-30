import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {

  chosenFilterColumn = "";
  chosenFilterType = "";
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

  filterChange() {
    switch (this.chosenFilterColumn) {
      case "quantity":
        if (this.chosenFilterType === "ASC")
        this.allproducts.sort(this.compareQuantityAsc);
        else
        this.allproducts.sort(this.compareQuantityDesc);
        break;
      case "defective":
        if (this.chosenFilterType === "ASC")
        this.allproducts.sort(this.compareDefectiveAsc);
        else
        this.allproducts.sort(this.compareDefectiveDesc);
        break;
      case "name":
        if (this.chosenFilterType === "DESC")
        this.allproducts.sort(this.compareNameDesc);
        else
        this.allproducts.sort(this.compareNameAsc);
        break;
    }
  }

  compareNameAsc(a: any, b: any) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  compareNameDesc(a: any, b: any) {
    if (a.name > b.name)
      return -1;
    if (a.name < b.name)
      return 1;
    return 0;
  }

  compareQuantityAsc(a: any, b: any) {
    if (a.quantity < b.quantity)
      return -1;
    if (a.quantity > b.quantity)
      return 1;
    return 0;
  }

  compareQuantityDesc(a: any, b: any) {
    if (a.quantity > b.quantity)
      return -1;
    if (a.quantity < b.quantity)
      return 1;
    return 0;
  }

  compareDefectiveAsc(a: any, b: any) {
    if (a.defective < b.defective)
      return -1;
    if (a.defective > b.defective)
      return 1;
    return 0;
  }

  compareDefectiveDesc(a: any, b: any) {
    if (a.defective > b.defective)
      return -1;
    if (a.defective < b.defective)
      return 1;
    return 0;
  }

}
