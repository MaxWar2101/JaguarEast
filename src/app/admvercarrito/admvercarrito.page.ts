import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admvercarrito',
  templateUrl: 'admvercarrito.page.html',
  styleUrls: ['admvercarrito.page.scss']
})
export class AdmvercarritoPage {

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  carritos: any = null;

  ngOnInit() {
    this.cargarCarritos();
  }

  async cargarCarritos(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://cafeteria.test/carritos/"+id+"?expand=estado,personal,cupon,salon,metodo,tarjeta",
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