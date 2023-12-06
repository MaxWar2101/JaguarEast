import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admpersonalcrear',
  templateUrl: './admpersonalcrear.page.html',
  styleUrls: ['./admpersonalcrear.page.scss'],
})
export class AdmPersonalCrearPage {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  urlPersonal: string = `${environment.apiUrl}personals`;
  urlGenero: string = `${environment.apiUrl}genero/`;

  public personal!: FormGroup;

  generos: any = [];

  mensajes_validacion: any = {
    per_nombre: [{ type: 'required', message: 'Nombre(s) requeridos.' }],
    per_paterno: [{ type: 'required', message: 'Apellido Paterno requerido.' }],
    per_materno: [{ type: 'required', message: 'Apellido Materno requerido.' }],
    per_fkgenero: [{ type: 'required', message: 'Genero requerida.' }],
    per_telefono: [
      { type: 'required', message: 'Telefono requerido.' },
      {
        type: 'minLength',
        message: 'Telefono debe contener al menos 10 caracteres.',
      },
      {
        type: 'maxLength',
        message: 'Telefono no debe contener más de 10 caracteres.',
      },
    ],
    per_matricula: [
      { type: 'required', message: 'Matricula requerido.' },
      {
        type: 'minLength',
        message: 'Matrícula debe contener al menos 8 caracteres.',
      },
      {
        type: 'maxLength',
        message: 'Matrícula no debe contener más de 10 caracteres.',
      },
    ],
    per_correo: [{ type: 'required', message: 'Correo requerido.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarGeneros();
    this.formulario();
  }

  async cargarGeneros() {
    const response = await axios({
      method: 'get',
      url: this.urlGenero,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.generos = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  private formulario() {
    this.personal = this.formBuilder.group({

      per_nombre: ['', [Validators.required]],
      per_paterno: ['', [Validators.required]],
      per_materno: ['', [Validators.required]],
      per_fkgenero: ['', [Validators.required]],
      per_telefono: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]{10}$")])],
      per_matricula: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern("^[1|2][0-9]{7,9}$")])],
      per_correo: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^(.+)@(gmail\\.com|hotmail\\.com)$")])],
    })
  }

  async guardarDatos() {
    try {
      const personal = this.personal?.value;
      const response = await axios({
        method: 'post',
        url: this.urlPersonal,
        data: personal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.per_id, 'El usuario  ' + response.data.per_nombre + ' ha sido registrada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertGuardado(personal.per_id, error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.personal.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(per_id: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Personal',
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
            this.router.navigate(['/tabs/admpersonal']);
          },

        },
      ],
    });

    await alert.present();
  }

}
