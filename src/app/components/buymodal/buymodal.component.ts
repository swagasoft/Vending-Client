import { ModalController } from '@ionic/angular';
import { LogicService } from './../../services/logic.service';
/* eslint-disable no-underscore-dangle */
import { UserService } from 'src/app/services/user.service';
import { Product } from './../../interfaces/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buymodal',
  templateUrl: './buymodal.component.html',
  styleUrls: ['./buymodal.component.scss'],
})
export class BuymodalComponent implements OnInit {
@Input() id: string;
product: Product;
purchaseCoinList: any[] = [];


model = { coinList:[], productId:undefined, itemQuantity:1};
  changeList: any[] = [];

  constructor(private userService: UserService, private logicService: LogicService,
    private modalController: ModalController) {}

  ngOnInit() {
    this.userService.getProduct(this.id).subscribe((product: Product) => {
      console.log(product);
      this.product = product;
    }, err => {
      console.log(err);
    });
  }



  selectCoin(coinValue){
    const newCurrency = {coinDenomination: coinValue, currencyType: 1, quantity: 1 };
    const exist = this.purchaseCoinList.find((coin)=> coin.coinDenomination === newCurrency.coinDenomination);
    if(exist){
    const tempList = this.purchaseCoinList.map((coin)=> {
      if(coin.coinDenomination === newCurrency.coinDenomination){
        return {...coin, quantity: coin.quantity + 1 };
      }else{
        return coin;
      }
    });
    this.purchaseCoinList = tempList;
    }else{
      this.purchaseCoinList.push(newCurrency);
    }
  }

  deleteCoin(coin){
    const newList = this.purchaseCoinList.filter( item =>  item.coinDenomination !== coin.coinDenomination);
    this.purchaseCoinList =  newList;
  }

  closeModal(){
    this.modalController.dismiss();
  }


  buyNowAction(product: Product){
    // console.log(product);
    this.model.productId = product.id;
    this.model.coinList = this.purchaseCoinList;
    console.log(this.model);
      try {
        this.userService.buyProduct(this.model).subscribe( (res: any) => {
          console.log(res);
          this.product = res.product;
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.logicService.generalToast(res['msg']);
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.changeList = res['change'];
          setTimeout(() => {
            // this.modalController.dismiss();
          }, 5000);
        }, err => {
          console.log('err ', err);
          this.logicService.generalToast(err.error.msg);
        });
      } catch (error) {
        console.log('Err ', error);
      }
        }

}
