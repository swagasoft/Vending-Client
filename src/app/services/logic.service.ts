import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private toastController: ToastController) { }

  async generalToast(message) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 3000,
      position:'top',
    });
    toast.present();
  }
}
