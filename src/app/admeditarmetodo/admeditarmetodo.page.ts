import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admeditarmetodo',
  templateUrl: './admeditarmetodo.page.html',
  styleUrls: ['./admeditarmetodo.page.scss'],
})
export class AdmeditarmetodoPage implements OnInit {

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

  metodos: any = null;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}metodos/`;

  ngOnInit() {
    this.cargarMetodo();
  }

  async cargarMetodo(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.url + id,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.metodos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
