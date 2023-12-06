import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.page.html',
  styleUrls: ['./membresia.page.scss'],
})
export class MembresiaPage {

  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  constructor(
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,

  ) { }

  membresias: any = [];
  personals: any = [];
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}membresias`;
  urlPersonal: string = `${environment.apiUrl}personals/`;

  ngOnInit() {
    this.cargarMembresia();
    this.cargarPersonal();
  }
  memGratuita(membresia: any) {
    return membresia.mem_id !== 5;
  }
  async cargarMembresia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.url,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.membresias = response.data.filter(this.memGratuita);
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async cargarPersonal(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'lines-sharp-small',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.urlPersonal + localStorage.getItem('id') + `?expand=membresia`,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.personals = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }
}
