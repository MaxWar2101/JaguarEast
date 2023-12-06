import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm-personal-mem',
  templateUrl: './adm-personal-mem.page.html',
  styleUrls: ['./adm-personal-mem.page.scss'],
})
export class AdmPersonalMemPage implements OnInit {
  menuType: string = 'overlay';

  constructor(
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private alert: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarPerMem();
  }
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}personal-membresias`;

  personalMembresias: any = [];
  busqueda: string = '';
  page: number = 1;
  totalPerMems: number = 0;


  async cargarPerMem(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'lines-sharp-small',
    });
    await loading.present();
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = this.url+`?expand=nombre,membresia,vigencia&page=${this.page}`
    } else {
      urlApi = this.url+`/buscar/${this.busqueda}?expand=nombre,membresia,vigencia&page=${this.page}`;
    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.personalMembresias = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarPerMem();
  }

  async contarPerMem() {
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = `${environment.apiUrl}personal-membresias/total/`;
    } else {
      urlApi = `${environment.apiUrl}personal-membresias/total/` + this.busqueda;
    }
    const response = await axios({
      method: 'get',
      url: urlApi,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.totalPerMems = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarPerMem();
  }
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarPerMem();
    this.contarPerMem();
  }
}
