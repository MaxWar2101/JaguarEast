import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admnuevosalon',
  templateUrl: './admnuevosalon.page.html',
  styleUrls: ['./admnuevosalon.page.scss'],
})

export class AdmnuevosalonPage implements OnInit {

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
    private rout: Router,
  ) { }

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}salons`;
  id = this.route.snapshot.paramMap.get('id');

  public salon!: FormGroup;
  private editarDatos = [];

  mensajes_validacion: any = {
    'sal_edificio': [
      { type: 'required', message: 'Edificio requerido.' },
    ],
    'sal_numero': [
      { type: 'required', message: 'Número requerido.' },
    ],
  }

  ngOnInit() {
    if (this.id !== null) {
      this.getDetalle();
    }
    this.formulario();
  }

  private formulario() {
    this.salon = this.formBuilder.group({
      sal_edificio: ['', [Validators.required]],
      sal_numero: ['', [Validators.required]],
    });
  }

  async cargarSalones() {
    const response = await axios({
      method: 'get',
      url: this.url,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.salon = response.data;
      // event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos() {
    // const id = this.route.snapshot.paramMap.get('id');
    try {
      const salon = this.salon?.value;
      if (this.id === null) {
        const response = await axios({
          method: 'post',
          url: this.url,
          data: salon,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.sal_id, 'El salon ha sido registrado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(salon.sal_id, error?.response?.data[0]?.message, "Error");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.url + '/' + this.id,
          data: salon,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.sal_id, 'El salon con id ' + response.data.sal_id + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(salon.sal_id, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.salon.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(id: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Salón',
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
            this.rout.navigate(['/tabs/admsalon']);
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
        const control = this.salon.get(String(key));
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
