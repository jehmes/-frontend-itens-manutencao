import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-pop-up-delete',
  templateUrl: './pop-up-delete.component.html',
  styleUrls: ['./pop-up-delete.component.scss']
})
export class PopUpDeleteComponent implements OnInit {

  productId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceProductService, private router: Router, private matDialog: MatDialog) { 
    this.productId = data.productId
  }

  ngOnInit(): void {
  }

   confirmDelete() {
    if (this.productId) {
      this.service.deleteProduct(this.productId).subscribe((data) => {
        this.service.showMessage("Produto excluído com sucesso!", 'green-snackbar')

        this.matDialog.closeAll()
        location.reload()
      }, err => {
        this.service.showMessage("Não foi possível excluir o produto!", 'red-snackbar')
        console.log(err)
      })
    }
  }

}
