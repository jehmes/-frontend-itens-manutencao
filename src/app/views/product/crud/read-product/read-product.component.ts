import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { ProductFilter } from 'src/app/models/ProductFilter'

import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.scss']
})
export class ReadProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'defective', 'moneyValue'];
  dataSource!: MatTableDataSource<Product>;
  showPaginator = true;

  @ViewChild(MatPaginator, {static: false}) paginator! : MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  filterForm!: FormGroup;

  constructor(private service: ServiceProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.createForm();
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;     
      this.showPaginator = this.dataSource.data.length > 0 ? true : false;
    })
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      name: [null],
      moneyValue: [null, Validators.pattern(/^[0-9]\d*$/)],
      defective: [null, Validators.pattern(/^[0-9]\d*$/)],
      quantity: [null, Validators.pattern(/^[0-9]\d*$/)]
    })
  }

  filter() {
    let filters: ProductFilter = this.filterForm.value
    if (!this.filterForm.valid) {
      this.service.showMessage("Campos inválidos!", 'red-snackbar')
      return
    }

    filters.name = filters.name === "" ? null : filters.name;
    filters.moneyValue = filters.moneyValue === "" ? null : filters.moneyValue;
    filters.defective = filters.defective === "" ? null : filters.defective;
    filters.quantity = filters.quantity === "" ? null : filters.quantity;

    this.service.getProductsByFilter(filters).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.showPaginator = this.dataSource.data.length > 0 ? true : false;
    })
  }

  

}
