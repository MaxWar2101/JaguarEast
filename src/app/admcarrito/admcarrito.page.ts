import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admcarrito',
  templateUrl: 'admcarrito.page.html',
  styleUrls: ['admcarrito.page.scss']
})
export class AdmcarritoPage {
  menuType: string = 'push';
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  carritos: any = [];

  ngOnInit() {
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

  
}
