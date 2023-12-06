import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfileditar',
  templateUrl: './perfileditar.page.html',
  styleUrls: ['./perfileditar.page.scss'],
})
export class PerfilEditarPage {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  per_id!: string;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  urlPersonal: string = `${environment.apiUrl}personals`;
  urlGenero: string = `${environment.apiUrl}generos`;

  private editarDatos = [];
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.per_id = '';
    this.activatedRoute.params.subscribe((params) => {
      this.per_id = params['per_id'];
    });
  }

  ngOnInit() {
    this.cargarGeneros();
    if (this.per_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  async cargarGeneros() {
    const response = await axios({
      method: 'get',
      url: this.urlGenero,
      withCredentials: true,
      headers: this.headers
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
    if (this.per_id !== undefined) {
      this.personal.get('per_id')?.disable();
    }
  }

  async guardarDatos() {
    try {
      const personal = this.personal?.value;
      if (this.per_id === undefined) {
        const response = await axios({
          method: 'post',
          url: this.urlPersonal,
          data: personal,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.per_id, 'El usuario con matricula ' + response.data.per_matricula + ' ha sido registrada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(personal.per_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertGuardado(personal.per_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.urlPersonal + '/' + this.per_id,
          data: personal,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.per_id, 'El usuario con matricula ' + response.data.per_id + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(personal.per_id, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch (e) {
      console.error('Error en la solicitud HTTP:', e);;
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
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/perfil']);
          },
        },
      ],
    });

    await alert.present();
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.urlPersonal + "/" + this.per_id,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.personal.get(String(key));
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
