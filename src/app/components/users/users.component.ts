import { BuymodalComponent } from './../buymodal/buymodal.component';
import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
productList: Product[] = [];
  constructor(private userService: UserService, private modalController: ModalController) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getProductList();
  }

  getProductList(){
    this.userService.getProductList().subscribe((res: Product[]) => {
      console.log('res ', res);
      this.productList = res;
    }, err => {
      console.log('Errr', err);
    });
  }

  async buyNowModal(product: Product) {
    const modal = await this.modalController.create({
    component: BuymodalComponent,
    // eslint-disable-next-line no-underscore-dangle
    componentProps: { id: product.id }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.getProductList();

  }

}
