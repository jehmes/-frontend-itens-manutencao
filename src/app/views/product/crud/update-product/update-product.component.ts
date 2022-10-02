import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  
  updateForm!: FormGroup;
  userFile: any = File;

  constructor(private route: ActivatedRoute, private service: ServiceProductService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getId();
    this.createForm();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.getProductById(params['id']);
  })
  }

  updateProduct() {
    if (!this.updateForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }
    let payload = this.updateForm.value
    let id:any = this.updateForm.get("id")?.value;
    this.service.updateProduct(payload, id).subscribe(() => {
      this.limparForm()
      this.service.showMessage("Edição realizada com sucesso!", 'green-snackbar')
      setTimeout(() => {this.router.navigate(['/product'])}, 1500)
    },
      err => {
        this.service.showMessage("Não foi possível realizar a edição!", 'red-snackbar')
        console.log(err)
      })
  }

  setFileImage (imageName: string) {
    const fileInput: any = document.querySelector('input[type="file"]');
    const myFile = new File(['Hello World!'], imageName, {
        type: 'text/plain',
        lastModified: 0o0,
    });

    // Now let's create a DataTransfer to get a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
  }

  getProductById(id: number) {
    this.service.getProductById(id).subscribe((data) => {
      this.updateForm.setValue(data);
      this.setFileImage(data.imageName!);
    }, (response) => {
      console.log(response)
    })
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern(/^[0-9]/)]],
      defective: [null, [Validators.required, Validators.pattern(/^[0-9]/)]],
      moneyValue: [null, [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      imageName: [null, Validators.required],
      binaryImage: [null, Validators.required]
    })
  }

  onChange(event: any) {
    if (!event.target.files[0]) {
      return;
    }
    //Pega a imagem pra ser transformado em um formData
    let imageName = event.target.files[0].name
    this.updateForm.get('imageName')!.setValue(imageName)
    this.userFile = event.target.files[0]

    const filereader = new FileReader()
      
    filereader.readAsDataURL(this.userFile)
    
    filereader.onload = () => {
      this.updateForm.get('binaryImage')!.setValue(filereader.result)
    }
  }

  limparForm() {
    this.updateForm.reset()
  }
}
