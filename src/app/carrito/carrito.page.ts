import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-carrito',
  templateUrl: 'carrito.page.html',
  styleUrls: ['carrito.page.scss']
})
export class CarritoPage {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  menuType: string = 'push';
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  personal: any = [];

  headers:any = {'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') || 'Bearer 100-token'};
  url:string  = `${environment.apiUrl}personals/${localStorage.getItem('id')}?expand=carritos`;

  ngOnInit() {
    this.cargarPersonal();
  }

  async cargarPersonal(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.url,
      withCredentials: true,
      headers: this.headers

    }).then((response) => {
      this.personal = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }


}