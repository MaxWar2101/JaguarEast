import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  isToastOpen = false;
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  public registro!: FormGroup;
  generos: any = null;
  url: string = `${environment.apiUrl}genero/`;

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';

  validation_messages: any = {
    'username': [
      { type: 'required', message: 'Usuario requerido.' },
      { type: 'minlength', message: 'El usuario debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'El usuario no puede contener más de 10 caracteres.' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 15 caracteres.' },
    ],
    'password_confirm': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 15 caracteres.' },
      { type: 'notEquivalent', message: 'No coinciden las contraseñas' },
    ],
    'per_nombre': [
      { type: 'required', message: 'Nombre(s) requerido(s).' },
    ],
    'per_paterno': [
      { type: 'required', message: 'Apellido Paterno requerido.' },
    ],
    'per_materno': [
      { type: 'required', message: 'Apellido Materno requerido.' },
    ],
    'per_fkgenero': [
      { type: 'required', message: 'Genero requerido.' },
    ],
    'per_telefono': [
      { type: 'required', message: 'Telefono requerido.' },
      { type: 'pattern', message: 'Dígita un telefono valido' },
    ],
    'per_maricula': [
      { type: 'required', message: 'Matricula requerido.' },
      { type: 'pattern', message: 'Dígita una matricula valida' },
    ],
    'per_correo': [
      { type: 'required', message: 'Coreo requerido.' },
      { type: 'pattern', message: 'Dígita un correo valido' },
    ],
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.cargarGeneros();
    this.setOpen(true);
  }

  buildForm() {
    this.registro = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(6),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.required
      ])],
      password_confirm: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.required
      ])],
      per_nombre: ['', [Validators.required]],
      per_paterno: ['', [Validators.required]],
      per_materno: ['', [Validators.required]],
      per_fkgenero: ['', [Validators.required]],

      per_telefono: ['', Validators.compose([
        Validators.pattern("^[0-9]{10}$"),
        Validators.required
      ])],
      per_matricula: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(8),
        Validators.pattern("^[0|1|2][0-9]{7,9}$"),
        Validators.required
      ])],
      per_correo: ['', Validators.compose([
        Validators.pattern(".*@.*(\.com|\.mx|\.com\.mx)+"),
        Validators.required
      ])],
    },
      { validator: this.checkIfMatchingPasswords('password', 'password_confirm') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  async cargarGeneros() {
    const response = await axios({
      method: 'get',
      url: this.url,
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

  async submitRegistrar() {
    localStorage.clear();
    const registrarData = this.registro?.value;
    try {
      await this.loginService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            console.log(response);
            await localStorage.setItem('token', response?.data.token);
            await localStorage.setItem('id', response?.data.id);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);
            this.router.navigate(['/tabs/admcarrito']);//Cambia el index
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.status == 422) {
            this.alertDuplicado();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Nombre de usuario o contraseña incorrecta.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  async alertDuplicado() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Duplicado',
      message: 'El usuario ya se encuentra registrado',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });

    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.registro.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  login() {
    this.router.navigate(['/']);
  }

  togglePasswordMode() {
    const e = window.event;
    e!.preventDefault();
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }


}
