/* eslint-disable no-underscore-dangle */
import { Currency } from './../../interfaces/product';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LogicService } from 'src/app/services/logic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-currency-modal',
  templateUrl: './currency-modal.component.html',
  styleUrls: ['./currency-modal.component.scss'],
})
export class CurrencyModalComponent implements OnInit {

  @Input() currency: Currency;
  newCoinList: any[] = [];




  constructor(  private userService: UserService,
    private modalController: ModalController, private logicService: LogicService) {


  }

  ngOnInit() {

  }


  selectCoin(coinValue){
    const newCurrency = {coinDenomination: coinValue, currencyType: 1, quantity: 1 };
    const exist = this.newCoinList.find((coin)=> coin.coinDenomination === newCurrency.coinDenomination);
    if(exist){
    const tempList = this.newCoinList.map((coin)=> {
      if(coin.coinDenomination === newCurrency.coinDenomination){
        return {...coin, quantity: coin.quantity + 1 };
      }else{
        return coin;
      }
    });
    this.newCoinList = tempList;
    }else{
      this.newCoinList.push(newCurrency);
    }
  }


  closeModal(){
    this.modalController.dismiss();
  }


  deleteCoin(coin){
    const newList = this.newCoinList.filter( item =>  item.coinDenomination !== coin.coinDenomination);
    this.newCoinList =  newList;
  }


  submit(){
      //  new product
      this.userService.createCurrency(this.newCoinList).subscribe( res => {
        this.modalController.dismiss();
      }, err => {
        console.log(err.error.msg);
        this.logicService.generalToast(err.error.msg);
      });


  }

}
