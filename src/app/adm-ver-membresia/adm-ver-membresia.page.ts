import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm-ver-membresia',
  templateUrl: './adm-ver-membresia.page.html',
  styleUrls: ['./adm-ver-membresia.page.scss'],
})
export class AdmVerMembresiaPage implements OnInit {
  
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  menuType: string = 'overlay';

  constructor(
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private alert: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarMembresia();
  }

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}membresias`;

  membresias: any = [];
  busqueda: string = '';
  page: number = 1;
  totalMembresias: number = 0;

  async cargarMembresia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'lines-sharp-small',
    });
    await loading.present();
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + '?per';
    } else {
      urlApi = this.url + '/buscar/' + this.busqueda;
    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.membresias = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarMembresia();
  }

  async contarMembresia() {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url + '';
    } else {
      urlApi = this.url + '/total/' + this.busqueda;
    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.membresias = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarMembresia();
  }
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarMembresia();
  }
  //Parte de eliminacion
  async alertEliminar(id: number) {
    const alert = await this.alert.create({
      header: 'Borrar Membresia',
      subHeader: "Seguro desea eliminar esta membresia",
      message: "Esta accion no se podra deshacer",
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
        },
        {
          text: 'Seguro???',
          role: 'confirm',
          handler: () => {
            this.borrarDatos(id);
          },
        },
      ]
    })
    await alert.present();
  }

  async borrarDatos(id: number) {
    try {
      const response = await axios({
        method: 'delete',
        url: this.url + '/' + id,
        withCredentials: true,
        headers: this.headers
      }).then((response) => {
        if (response?.status == 204) {
          this.alertBorrado(id, 'La membresia con id ' + id + ' ha sido borrada');
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

  private async alertBorrado(id: number, msg = "", subMsg = "Borrado") {
    const alert = await this.alert.create({
      header: 'Membresia',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            this.regresar();
          }
        },
      ],
    });

    await alert.present();
  }
  private regresar() {
    this.router.navigate(['/adm-ver-membresia']).then(() => {
      window.location.reload();
    });
  }

}
