/* eslint-disable no-underscore-dangle */
import { Product } from './../../interfaces/product';
import { LogicService } from './../../services/logic.service';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productmodal',
  templateUrl: './productmodal.component.html',
  styleUrls: ['./productmodal.component.scss'],
})
export class ProductmodalComponent implements OnInit {
  @Input() product: Product;
  productForm: FormGroup;




  constructor( private formBuilder: FormBuilder, private userService: UserService,
    private modalController: ModalController, private logicService: LogicService) {


    this.productForm = this.formBuilder.group({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      image_url: new FormControl('', [Validators.required]),
      quantity: new FormControl(2),

  });
  }

  ngOnInit() {
    if (this.product?.id){
      this.productForm.get('productName').setValue(this.product.productName);
      this.productForm.get('description').setValue(this.product.description);
      this.productForm.get('price').setValue(this.product.price);
      this.productForm.get('image_url').setValue(this.product.image_url);
      // this.productForm.get('currencyType').setValue(this.product.currencyType);
      this.productForm.get('quantity').setValue(this.product.quantity);
    }
  }


  submit(){
    if(this.product?.id){
      // update
      console.log('update');
      this.product = {...this.product, ...this.productForm.value};
      this.userService.updateProduct(this.product).subscribe( res => {
        this.modalController.dismiss();
      }, err => {
        console.log(err.error.msg);
        this.logicService.generalToast(err.error.msg);
      });
    }else{
      //  new product
      console.log('new product');
      this.userService.createProduct(this.productForm.value).subscribe( res => {
        this.modalController.dismiss();
      }, err => {
        console.log(err.error.msg);
        this.logicService.generalToast(err.error.msg);
      });

    }

  }

  closeModal(){
    this.modalController.dismiss();
  }

}
