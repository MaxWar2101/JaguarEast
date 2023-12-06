import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm-genero-crear',
  templateUrl: './admgenerocrear.page.html',
  styleUrls: ['./admgenerocrear.page.scss'],
})
export class AdmGeneroCrearPage {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  
  router: Router;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}generos`;

  public genero!: FormGroup;

  mensajes_validacion: any = {
    gen_nombre: [{ type: 'required', message: 'Nombre(s) requeridos.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private _router: Router

  ) {
    this.router = _router;
  }

  ngOnInit() {
    this.formulario();
  }

  private formulario() {
    this.genero = this.formBuilder.group({
      gen_nombre: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const genero = this.genero?.value;
      const response = await axios({
        method: 'post',
        url: this.url,
        data: genero,
        headers: this.headers
      })
        .then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(
              response.data.gen_id,
              'El genero con matricula ' +
              response.data.gen_nombre +
              ' ha sido registrada'
            );
          }
        })
        .catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(
              genero.gen_id,
              error?.response?.data[0]?.message,
              'Error'
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.genero.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(gen_id: String, msg = '', subMsg = 'Guardado') {
    const alert = await this.alert.create({
      header: 'Genero',
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
            this.regresar();
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
}
