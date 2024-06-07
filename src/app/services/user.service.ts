import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProductList(){
    return this.httpClient.get(environment.apiBaseUrl + '/users/products-list');
  }
  getProduct(id){
    return this.httpClient.get(environment.apiBaseUrl + `/users/product/${id}`);
  }
  deleteProduct(id){
    return this.httpClient.delete(environment.apiBaseUrl + `/manager/product/${id}`);
  }

  createProduct(form){
    return this.httpClient.post(environment.apiBaseUrl + `/manager/product/`, form);
  }

  updateProduct(form){
    return this.httpClient.patch(environment.apiBaseUrl + `/manager/product/`, form);
  }

  createCurrency(form){
    return this.httpClient.post(environment.apiBaseUrl + `/manager/currency/`, form);
  }

  getCurrencyList(){
    return this.httpClient.get(environment.apiBaseUrl + `/manager/currency-list/`);
  }

  getCurrencyById(id){
    return this.httpClient.get(environment.apiBaseUrl + `/manager/currency/${id}`);
  }
  deleteCurrency(id){
    return this.httpClient.delete(environment.apiBaseUrl + `/manager/currency/${id}`);
  }

  updateCurrency(form){
    return this.httpClient.patch(environment.apiBaseUrl + `/manager/currency/`, form);
  }

  buyProduct(form){
    return this.httpClient.put(environment.apiBaseUrl + `/users/buy-product/`, form);
  }
}
