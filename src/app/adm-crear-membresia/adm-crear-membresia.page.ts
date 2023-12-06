import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm-crear-membresia',
  templateUrl: './adm-crear-membresia.page.html',
  styleUrls: ['./adm-crear-membresia.page.scss'],
})
export class AdmCrearMembresiaPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private route: Router,
    private rout: ActivatedRoute) { }


  private editarDatos = [];
  id = this.rout.snapshot.paramMap.get('id');
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}membresias`;


  public membresia!: FormGroup;

  ngOnInit() {
    if (this.id !== null) {
      this.getDetalle();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'mem_nombre': [
      { type: 'required', message: 'Nombre de membresia requerida.' },
    ],

    'mem_vigencia': [
      { type: 'required', message: 'Vigencia requerida.' },
    ],
    'mem_beneficios': [
      { type: 'required', message: 'beneficios requerido.' },
    ],
    'mem_precio': [
      { type: 'required', message: 'Precio requerido.' },
      { type: 'min', message: 'Precio mínimo 0' },
      { type: 'max', message: 'Precio maximo 10000' }
    ],
    'mem_condicion': [
      { type: 'required', message: 'Conciones requeridas.' },
    ],
  }
  private formulario() {
    this.membresia = this.formBuilder.group({
      mem_nombre: ['', [Validators.required]],
      mem_vigencia: ['', [Validators.required]],
      mem_beneficios: ['', [Validators.required]],
      mem_precio: ['', Validators.compose([
        Validators.min(0),
        Validators.max(9999),
        Validators.required,
      ])],
      mem_condicion: ['', [Validators.required]],
    })
  }
  async getDetalle() {
    const response = await axios({
      method: 'get',
      url: this.url + '/' + this.id,
      withCredentials: true,
      headers:this.headers
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.membresia.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos() {
    try {
      const membresia = this.membresia?.value;
      if (this.id === null) {
        const response = await axios({
          method: 'post',
          url: this.url,
          data: membresia,
          headers:this.headers
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.mem_id, 'La membresia con id ' + response.data.mem_id + ' ha sido registrada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(membresia.mem_id, error?.response?.data[0]?.message, "Error");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.url + '/' + this.id,
          data: membresia,
          headers: this.headers
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.mem_id, 'La membresia con id ' + response.data.mem_id + ' ha sido actualizada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(membresia.mem_id, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.membresia.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(matricula: String, msg = "", subMsg = "Guardado") {
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
          },
        }
      ],
    });

    await alert.present();
  }
  private regresar() {
    this.route.navigate(['/adm-ver-membresia']).then(() => {
      window.location.reload();
    });
  }

}
