import { Component } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admpersonal',
  templateUrl: 'admpersonal.page.html',
  styleUrls: ['admpersonal.page.scss'],
})

export class AdmPersonalPage {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  
  menuType: string = 'overlay';

  modalCrtl: any;
  alertCtrl: any;
  router: Router;
  busqueda: string = '';
  page: number = 1;
  totalPersonal: number = 0;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}personal`;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private _router: Router,
  ) {
    this.alertCtrl = alertController;
    this.router = _router;
  }

  personales: any = [];

  ngOnInit() {
    this.cargarPersonales();
    this.contarPersonal();
  }

  async cargarPersonales(event?: InfiniteScrollCustomEvent) {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + `s?expand=perFkgenero&page=${this.page}`;
    } else {
      urlApi = this.url + `/buscar/${this.busqueda}?expand=perFkgenero&page=${this.page}`;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    })
      .then((response) => {
        this.personales = response.data;
        event?.target.complete();
      })
      .catch(function (error) {
        console.log(error);
      });
    loading.dismiss();
  }

  async alertEliminar(per_id: string, per_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Personal',
      subHeader: 'Eliminar',
      message:
        '¿Estás seguro de eliminar al personal con id ' +
        per_id +
        ' con nombre: ' +
        per_nombre +
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
            this.eliminar(per_id);
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminar(per_id: string) {
    const response = await axios({
      method: 'delete',
      url: this.url + 's/' + per_id,
      withCredentials: true,
      headers: this.headers
    })
      .then((response) => {
        if (response?.status == 204) {
          this.alertEliminado(
            per_id,
            'El personal con id:  ' + per_id + ' ha sido eliminado'
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async alertEliminado(per_id: string, msg = '') {
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
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/tabs/admpersonal']).then(() => {
      window.location.reload();
    });
  }

  async contarPersonal() {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + '/total?text=';
    } else {
      urlApi = this.url + `/total/${this.busqueda}`;

    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    })
      .then((response) => {
        this.totalPersonal = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarPersonales();
  }


  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarPersonales();
    this.contarPersonal();
  }
}
