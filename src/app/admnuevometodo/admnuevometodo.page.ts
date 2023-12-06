import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admnuevometodo',
  templateUrl: './admnuevometodo.page.html',
  styleUrls: ['./admnuevometodo.page.scss'],
})

export class AdmnuevometodoPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private route: ActivatedRoute,
    private rout: Router
  ) { }

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}metodos`;
  id = this.route.snapshot.paramMap.get('id');

  public metodo!: FormGroup;
  private editarDatos = [];

  mensajes_validacion: any = {
    'met_metodo': [
      { type: 'required', message: 'Metodo requerido.' },
    ],
  }

  ngOnInit() {
    if (this.id !== null) {
      this.getDetalle();
    }
    this.formulario();
  }

  private formulario() {
    this.metodo = this.formBuilder.group({
      met_metodo: ['', [Validators.required]],
    })
  }

  async cargarMetodos() {
    const response = await axios({
      method: 'get',
      url: this.url,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.metodo = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos() {
    try {
      const metodo = this.metodo?.value;
      if (this.id === null) {
        const response = await axios({
          method: 'post',
          url: this.url,
          data: metodo,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.met_id, 'El metodo ha sido registrada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(metodo.met_id, error?.response?.data[0]?.message, "Error");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.url + '/' + this.id,
          data: metodo,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.met_id, 'El metodo con id ' + response.data.met_id + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(metodo.met_id, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.metodo.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(id: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Metodo',
      subHeader: subMsg,
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

            this.rout.navigate(['/tabs/admmetodo']);
          },
        },
      ],
    });

    await alert.present();
  }

  async getDetalle() {
    const response = await axios({
      method: 'get',
      url: this.url + "/" + this.id,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.metodo.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

}
