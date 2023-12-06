import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admcarrito',
  templateUrl: 'admcarrito.page.html',
  styleUrls: ['admcarrito.page.scss']
})
export class AdmcarritoPage {
  menuType: string = 'overlay';


  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  public carrito!: any;

  constructor(
    private alert: AlertController,
    private rout: Router,
    private loadingCtrl: LoadingController,
  ) { }

  carritos: any = [];
  
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}carritos`;

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
      url: this.url + "?expand=estado,personal,clase",
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.carritos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }


  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.carrito.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }
}
