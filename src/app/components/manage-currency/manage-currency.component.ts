/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Currency, Product } from 'src/app/interfaces/product';
import { UserService } from 'src/app/services/user.service';
import { CurrencyModalComponent } from '../currency-modal/currency-modal.component';
import { ProductmodalComponent } from '../productmodal/productmodal.component';

@Component({
  selector: 'app-manage-currency',
  templateUrl: './manage-currency.component.html',
  styleUrls: ['./manage-currency.component.scss'],
})
export class ManageCurrencyComponent implements OnInit {
  currencyList: Currency[] = [];

  constructor(private userService: UserService, private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.loadingCurrencies();
  }

  loadingCurrencies(){
    this.userService.getCurrencyList().subscribe((res: Currency[]) => {
      console.log('res ', res);
      // var MODULES =  _.groupBy(remoteResponse.data, 'Module_Name');
      this.currencyList = res;
    }, err => {
      console.log('Errr', err);
    });
  }


  async addCurrency() {
    const modal = await this.modalController.create({
    component: CurrencyModalComponent
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.loadingCurrencies();

  }
  async modifyCurrency(currency: Currency) {
    const modal = await this.modalController.create({
    component: CurrencyModalComponent,
    // eslint-disable-next-line object-shorthand
    componentProps: { product: currency }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.loadingCurrencies();

  }

  async deleteCurrency(currency: Currency) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Message <strong>Delete  ${currency.coinDenomination} </strong>!!!`,
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
            this.userService.deleteCurrency(currency.coinDenomination).subscribe( res => {
              this.loadingCurrencies();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  calculateCent(currList: Currency[]){
    let result = 0;
    currList.forEach(coin => {
      result += coin.coinDenomination * coin.quantity;
    });
    return result;
  }

  calculateCoin(currList: Currency[]){
    let result = 0;
    currList.forEach(coin => {
      result += coin.quantity;
    });
    return result;
  }


}
