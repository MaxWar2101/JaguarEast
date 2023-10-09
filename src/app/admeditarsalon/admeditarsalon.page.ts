import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admeditarsalon',
  templateUrl: './admeditarsalon.page.html',
  styleUrls: ['./admeditarsalon.page.scss'],
})
export class AdmeditarsalonPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
  ) { }

  salones: any = null;

  ngOnInit() {
    this.cargarSalones();
  }

  async cargarSalones(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://cafeteria.test/salons/"+id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.salones = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
