import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-admmetodo',
  templateUrl: './admmetodo.page.html',
  styleUrls: ['./admmetodo.page.scss'],
})
export class AdmmetodoPage implements OnInit {

  isAlertOpen = false;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  menuType: string = 'push';
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  metodos: any = [];

  ngOnInit() {
    this.cargarMetodos();
  }

  async cargarMetodos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://cafeteria.test/metodo",
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
