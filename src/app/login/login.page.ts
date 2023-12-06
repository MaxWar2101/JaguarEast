import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  login!: FormGroup;

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';

  validation_messages: any = {
    'username': [
      { type: 'required', message: 'usuario requerido.' },
      { type: 'minlength', message: 'usuario debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'usuario no puede contener más de 10 caracteres.' },
      { type: 'pattern', message: 'Dígita un usuario valido' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 10 caracteres.' },
      { type: 'pattern', message: 'Dígita una contraseña valida' },
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.login = this.formBuilder.group({
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
    });
  }

  async submitLogin() {
    localStorage.clear();
    const loginData = this.login?.value;
    try {
      await this.loginService.login(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data.token);
            await localStorage.setItem('id', response?.data.id);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', loginData.username);
            this.router.navigate(['/tabs/admcarrito']);
          } else if (response?.data == '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
      //this.alertError();

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

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.login.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  registrar() {
    this.router.navigate(['/registro']);
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
