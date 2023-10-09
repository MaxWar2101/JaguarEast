import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public alertButtons = ['OK'];
  public loaded = false;

  // handleRefresh(event) {
  //   setTimeout(() => {
  //     // Any calls to load data go here
  //     event.target.complete();
  //   }, 2000);
  // }

  items: any = [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 20; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }
  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  constructor(private toastController: ToastController) { }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Si salio! xd',
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
}
