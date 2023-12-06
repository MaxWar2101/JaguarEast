import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };

  urlCarrito: string = `${environment.apiUrl}carritos`;
  urlExistencia: string = `${environment.apiUrl}carrito/`;
  urlDetalle: string = `${environment.apiUrl}detalles`;
  urlProducto: string = `${environment.apiUrl}productos`;

  public detalle!: FormGroup;
  public carrito!: any;
  detalles: any = null;
  productos: any = null;

  mensajes_validacion: any = {
    'det_cantidad': [
      { type: 'required', message: 'Cantidad requerido.' },
      { type: 'min', message: 'Cantidad mínimo 1.' },
    ],
  }

  constructor(
    private alert: AlertController,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private rout: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario();
    this.cargarProducto();
  }

  private formulario() {
    this.detalle = this.formBuilder.group({
      det_cantidad: ['', Validators.compose([
        Validators.min(1),
        Validators.required,
      ])],
    })
  }

  async existenciaCarrito(producto: any) {
    const response = await axios({
      method: 'get',
      url: this.urlExistencia + "existencia",
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      if (response.data == null) {
        this.guardarDatos(producto);
      } else {
        this.guardarDetalle(producto, response.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos(producto: any) {
    try {
      const date = new Date();
      let carrito = {
        'car_fkpersonal': localStorage.getItem('id'),   
        'car_fecha': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        'car_hora': date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        'car_fkestado': 1,
      }
      const response = await axios({
        method: 'post',
        url: this.urlCarrito,
        data: carrito,
        headers: this.headers
      }).then((response) => {
        if (response?.status == 201) {
          this.guardarDetalle(producto, response.data.car_id);
        }
      }).catch((error) => {
        if (error?.response?.status != 201) {
          this.alertGuardado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async guardarDetalle(producto: any, carrito_id: number) {
    try {
      let detalle = {
        'det_fkproducto': producto.pro_id,
        'det_cantidad': this.detalle.value.det_cantidad,
        'det_precio': producto.pro_precio,
        'det_fkcarrito': carrito_id,
      }
      const response = await axios({
        method: 'post',
        url: this.urlDetalle,
        data: detalle,
        headers: this.headers

      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.car_id, 'El producto ha sido agregado');
        }
      }).catch((error) => {
        if (error?.response?.status != 201) {
          this.alertGuardado(error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }


  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.detalle.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(id: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Carrito',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async cargarProducto(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.urlProducto,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.productos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }



}

