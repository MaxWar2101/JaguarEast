import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admsalon',
  templateUrl: './admsalon.page.html',
  styleUrls: ['./admsalon.page.scss'],
})

export class AdmsalonPage implements OnInit {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  menuType: string = 'overlay';

  constructor(
    private loadingCtrl: LoadingController,
    private alert: AlertController,
  ) { }

  busqueda: string = '';
  page: number = 1;
  totalSalones: number = 0;

  salones: any = [];
  filterTerm: string = "";
  search: any;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}salons`;

  ngOnInit() {
    this.cargarSalones();
    this.contarSalones();
  }

  async cargarSalones(event?: InfiniteScrollCustomEvent) {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + '?page=' + this.page;
    } else {
      urlApi = this.url + '/buscar/' + this.busqueda + '?page=' + this.page;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circular',
      translucent: true,
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.salones = response.data;
      this.contarSalones();
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async alertElimiar(id: number) {
    const alert = await this.alert.create({
      header: 'Salon',
      subHeader: 'Eliminar',
      message: '¿Desea eliminar el registro?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.borrarDatos(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async borrarDatos(id: number) {
    try {
      const response = await axios({
        method: 'delete',
        url: this.url + "/" + id,
        withCredentials: true,
        headers: this.headers

      }).then((response) => {
        if (response?.status == 204) {
          this.alertBorrado(id, "El registro ha sido borrado");
        }
      }).catch((error) => {
        if (error?.response?.status != 204) {
          this.alertBorrado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
    }
  }

  async alertBorrado(id: number, msg = "", subMsg = "Borrado") {
    const alert = await this.alert.create({
      header: 'Salon',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Confimrmar',
          role: 'confirm',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });
    await alert.present();
  }

  async contarSalones() {
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
      this.totalSalones = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarSalones();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarSalones();
  }
}
