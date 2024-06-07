/* eslint-disable no-underscore-dangle */
import { ProductmodalComponent } from './../productmodal/productmodal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss'],
})
export class ManagersComponent implements OnInit {
  productList: Product[] = [];

  constructor(private userService: UserService, private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.loadingProduct();
  }

  loadingProduct(){
    this.userService.getProductList().subscribe((res: Product[]) => {
      console.log('res ', res);
      this.productList = res;
    }, err => {
      console.log('Errr', err);
    });
  }


  async addProduct() {
    const modal = await this.modalController.create({
    component: ProductmodalComponent,
    componentProps: { value: 123 }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.loadingProduct();

  }
  async modifyProduct(product: Product) {
    const modal = await this.modalController.create({
    component: ProductmodalComponent,
    // eslint-disable-next-line object-shorthand
    componentProps: { product: product }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.loadingProduct();

  }

  async deleteProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Message <strong>Delete  ${product.productName} </strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.userService.deleteProduct(product.id).subscribe( res => {
              this.loadingProduct();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}



