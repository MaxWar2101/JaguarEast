import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admeditarmetodo',
  templateUrl: './admeditarmetodo.page.html',
  styleUrls: ['./admeditarmetodo.page.scss'],
})
export class AdmeditarmetodoPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  metodos: any = null;

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
      url: "http://cafeteria.test/metodos/" + id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.metodos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
