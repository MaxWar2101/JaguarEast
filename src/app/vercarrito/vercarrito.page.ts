import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-vercarrito',
  templateUrl: './vercarrito.page.html',
  styleUrls: ['./vercarrito.page.scss'],
})
export class VercarritoPage implements OnInit {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  menuType: string = 'push';
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private router: Router,
  ) { }

  carritos: any = [];
  salones: any = null;
  metodos: any = null;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  urlCarrito: string = `${environment.apiUrl}carritos/`;
  urlSalon: string = `${environment.apiUrl}salons`;
  urlMetodo: string = `${environment.apiUrl}metodos`;
  urlDetalle: string = `${environment.apiUrl}detalles/`;

  ngOnInit() {
    this.cargarCarritos();
    this.cargarSalones();
    this.cargarMetodos();
  }

  async cargarCarritos(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.urlCarrito + id + "?expand=detalles",
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

  async cargarSalones(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.urlSalon,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.salones = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async cargarMetodos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.urlMetodo,
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

  async guardarDatos() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      let carrito = {
        'car_fkestado': 4,
      }
      const response = await axios({
        method: 'put',
        url: this.urlCarrito + id,
        data: carrito,
        headers: this.headers
      }).then((response) => {
        if (response?.status == 200) {
          this.alertGuardado("Guardado");
        }
      }).catch((error) => {
        if (error?.response?.status != 200) {
          this.alertGuardado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async alertGuardado(id: String, msg = "", subMsg = "El carrito se ha guardado") {
    const alert = await this.alert.create({
      header: 'Carrito',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/carrito']);
          },
        },

      ],
    });
    await alert.present();
  }

  async alertElimiar(id: number) {
    console.log(id);
    const alert = await this.alert.create({
      header: 'Metodo',
      subHeader: 'Eliminar',
      message: '¿Desea eliminar el producto?',
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
        url: this.urlDetalle + id,
        withCredentials: true,
        headers: this.headers
      }).then((response) => {
        if (response?.status == 204) {
          this.alertBorrado(id, "El producto ha sido borrado");
        }
      }).catch((error) => {
        if (error?.response?.status != 204) {
          this.alertBorrado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async alertBorrado(id: number, msg = "", subMsg = "Borrado") {
    const alert = await this.alert.create({
      header: 'Metodo',
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


}

