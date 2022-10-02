import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductFilter } from 'src/app/models/ProductFilter'
import {PopUpDeleteComponent} from 'src/app/components/pop-up-delete/pop-up-delete.component'

import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.scss']
})
export class ReadProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'defective', 'moneyValue', 'actions'];
  dataSource!: MatTableDataSource<Product>;
  showPaginator = true;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  filterForm!: FormGroup;

  constructor(private service: ServiceProductService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductsByFilter();
    this.createForm();
    setTimeout(() => {
      this.setFilters();
      this.setSort();
    }, 500)

  }

  getProductsByFilter() {
    let filter = this.service.getFilter()
    this.service.getProductsByFilter(filter).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.setPage()
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showPaginator = this.dataSource.data.length > 0 ? true : false;
    }, (response) => {
      console.log(response)
    })
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      name: [null],
      moneyValue: [null, Validators.pattern(/^[0-9]*\.?[0-9]*$/)],
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

  eventSortData(evt: any) {
    this.service.saveSessionStorage(null, evt, null);
  }

  eventFilter() {
    this.service.saveSessionStorage(this.filterForm.value, null, null);
  }

  eventPageSize(evt: any) {
    this.service.saveSessionStorage(null, null, evt);
  }


  setSort() {
    let sort = this.service.getSort()
    if (sort == null) {
      return;
    }
    const sortState: Sort = {
      active: sort.active,
      direction: sort.direction
    };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }

  setFilters() {
    let filter = this.service.getFilter();
    if (filter == null) {
      return;
    }
    this.filterForm.get("name")?.setValue(filter.name);
    this.filterForm.get("moneyValue")?.setValue(filter.moneyValue);
    this.filterForm.get("defective")?.setValue(filter.defective);
    this.filterForm.get("quantity")?.setValue(filter.quantity);
  }

  setPage() {
    let page = this.service.getPageSize();
    if (page == null) {
      return;
    }
    this.paginator.pageSize = page.pageSize;
    this.paginator.pageIndex = page.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  clear() {
    this.filterForm.reset()
    this.eventFilter()
  }

  redirect(e: any) {
    let url: string = "product/update/" + e.id
        this.router.navigateByUrl(url);
  }

  openConfirm(element: any) {
    this.dialog.open(PopUpDeleteComponent, {
      data: {
        productId: element.id
      }
    })
  }
}
