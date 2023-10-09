import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  menuType: string = 'push';
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  personales: any = [];
  carritos: any = [];

  ngOnInit() {
    this.cargarPersonales();
    this.cargarCarritos();
  }

  async cargarCarritos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://cafeteria.test/carrito?expand=estado,personal",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.carritos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async cargarPersonales(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://cafeteria.test/personal",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.personales = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.cargarPersonales(event)
  }
}
