import { CurrencyModalComponent } from './components/currency-modal/currency-modal.component';
import { ManageCurrencyComponent } from './components/manage-currency/manage-currency.component';
import { LogicService } from './services/logic.service';
import { ProductmodalComponent } from './components/productmodal/productmodal.component';
import { BuymodalComponent } from './components/buymodal/buymodal.component';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './services/user.service';
import { ManagersComponent } from './components/managers/managers.component';
import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, UsersComponent, ManagersComponent, BuymodalComponent,
  ProductmodalComponent, ManageCurrencyComponent, CurrencyModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    CommonModule,RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  UserService, LogicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
