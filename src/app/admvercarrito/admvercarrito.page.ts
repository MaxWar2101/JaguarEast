import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admvercarrito',
  templateUrl: 'admvercarrito.page.html',
  styleUrls: ['admvercarrito.page.scss']
})
export class AdmvercarritoPage {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  carritos: any = null;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}carritos/`;
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
      url: this.url + id + "?expand=estado,personal,cupon,salon,metodo,tarjeta,clase",
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