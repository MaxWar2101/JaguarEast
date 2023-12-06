import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios from 'axios';

@Component({
  selector: 'app-membresia-detalle',
  templateUrl: './membresia-detalle.page.html',
  styleUrls: ['./membresia-detalle.page.scss'],
})
export class MembresiaDetallePage implements OnInit {

  constructor(
    private alert: AlertController,
    private route: Router,
    private rout: ActivatedRoute) { }


  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}membresias/`;
  url2: string = `${environment.apiUrl}personal-membresias`;
  membresias: any = null;

  ngOnInit() {
    this.cargarMembresia();
  }

  async cargarMembresia(event?: InfiniteScrollCustomEvent) {

    const id = this.rout.snapshot.paramMap.get('id');
    const response = await axios({
      method: 'get',
      url: this.url + id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.membresias = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos() {
    try {
      const id = Number(this.rout.snapshot.paramMap.get('id'));
      const date = new Date();
      let permem = {
        'permem_fkpersonal':  localStorage.getItem('id'),
        'permem_fkmembresia': id,
        'permem_inicio': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        'permem_domiciliado': 0,
        'permem_fktarjeta': 1,
      }

      const response = await axios({
        method: 'post',
        url: this.url2,
        data: permem,
        headers: this.headers
      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.permem_id, 'Compra excitosa' + response.data.permem_id + ' ha sido registrada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertGuardado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    } 
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.membresias.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(matricula: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Membresia comprada',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            this.regresar();
          },
        }
      ],
    });

    await alert.present();
  }
  private regresar() {
    this.route.navigate(['/membresia']).then(() => {
      window.location.reload();
    });
  }

}
