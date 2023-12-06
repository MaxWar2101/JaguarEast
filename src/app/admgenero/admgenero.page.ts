import { Component } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admgenero',
  templateUrl: 'admgenero.page.html',
  styleUrls: ['admgenero.page.scss'],
})

export class AdmGeneroPage {
  menuType: string = 'overlay';

  
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  modalCrtl: any;
  alertCtrl: any;
  router: Router;
  busqueda: string = '';
  page: number = 1;
  totalGenero: number = 0;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}genero`;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private _router: Router
  ) {
    this.alertCtrl = alertController;
    this.router = _router;
  }

  generos: any = [];

  ngOnInit() {
    this.cargarGeneros();
    this.contarGenero();
  }

  async cargarGeneros(event?: InfiniteScrollCustomEvent) {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + 's?page=' + this.page;
    } else {
      urlApi = this.url + '/buscar/'+ this.busqueda+'?page=' + this.page;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
      translucent: true,
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
        this.generos = response.data;
        this.contarGenero();
        event?.target.complete();
      }).catch(function (error) {
        console.log(error);
      });
    loading.dismiss();
  }

  async alertEliminar(gen_id: string, gen_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Genero',
      subHeader: 'Eliminar',
      message:
        '¿Estás seguro de eliminar al personal con id ' +
        gen_id +
        ' con nombre: ' +
        gen_nombre +
        '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(gen_id);
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminar(gen_id: string) {
    const response = await axios({
      method: 'delete',
      url: this.url + "s/" + gen_id,
      withCredentials: true,
      headers: this.headers
    })
      .then((response) => {
        if (response?.status == 204) {
          this.alertEliminado(
            gen_id,
            'El personal con id:  ' + gen_id + ' ha sido eliminado'
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async alertEliminado(gen_id: String, msg = '') {
    const alert = await this.alertCtrl.create({
      header: 'Personal',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/tabs/admgenero']).then(() => {
      window.location.reload();
    });
  }

  async contarGenero() {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + '/total/';
    } else {
      urlApi = this.url + '/total/' + this.busqueda;
    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.totalGenero = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarGeneros();
  }


  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarGeneros();
  }
}
