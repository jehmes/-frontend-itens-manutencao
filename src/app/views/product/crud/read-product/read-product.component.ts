import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.scss']
})
export class ReadProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'defective', 'moneyValue'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: false}) paginator! : MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private service: ServiceProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    })
  }

}
