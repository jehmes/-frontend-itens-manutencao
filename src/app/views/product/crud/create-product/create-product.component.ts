import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProductService } from 'src/app/services/service-product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  cadastroForm!: FormGroup;
  userFile: any = File;
  teste: any;

  constructor(private formBuilder: FormBuilder, private service: ServiceProductService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createProduct() {
    if (!this.cadastroForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }
    let payload = this.cadastroForm.value
    this.service.createProduct(payload).subscribe(() => {
      this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'green-snackbar')
    },
      err => {
        this.service.showMessage("Não foi possível realizar o cadastro!", 'red-snackbar')
        console.log(err)
      })
  }
  
  createForm() {
    this.cadastroForm = this.formBuilder.group({
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
    this.cadastroForm.get('imageName')!.setValue(imageName)
    this.userFile = event.target.files[0]
    
    const filereader = new FileReader()
      
    filereader.readAsDataURL(this.userFile)
    
    filereader.onload = () => {
      this.cadastroForm.get('binaryImage')!.setValue(filereader.result)
    }
  }

  limparForm() {
    this.teste = "";
    this.cadastroForm.reset()
  }

}
