import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admgeneroeditar',
  templateUrl: './admgeneroeditar.page.html',
  styleUrls: ['./admgeneroeditar.page.scss'],
})
export class AdmGeneroEditarPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  gen_id!: string;

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}generos`;

  private editarDatos = [];

  public genero!: FormGroup;

  mensajes_validacion: any = {
    gen_nombre: [{ type: 'required', message: 'Nombre(s) requeridos.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.gen_id = '';
    this.activatedRoute.params.subscribe((params) => {
      this.gen_id = params['gen_id'];
    });
  }

  ngOnInit() {
    if (this.gen_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  private formulario() {
    this.genero = this.formBuilder.group({
      gen_nombre: ['', [Validators.required]],
    });
    if (this.gen_id !== undefined) {
      this.genero.get('gen_id')?.disable();
    }
  }

  async guardarDatos() {
    try {
      const genero = this.genero?.value;
      if (this.gen_id === undefined) {
        const response = await axios({
          method: 'post',
          url: this.url,
          data: genero,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.gen_id, 'El alumno con matricula ' + response.data.per_matricula + ' ha sido registrada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(genero.gen_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertGuardado(genero.gen_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.url + '/' + this.gen_id,
          data: genero,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.gen_id, 'El alumno con matricula ' + response.data.gen_id + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(genero.gen_id, error?.response?.data[0]?.message, "Error");
          }
        });
      }
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

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.url + "/" + this.gen_id,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.editarDatos = response.data;
      console.log(this.editarDatos);
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.genero.get(String(key));
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
