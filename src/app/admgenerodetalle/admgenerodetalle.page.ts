import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm-genero-detalle',
  templateUrl: './admgenerodetalle.page.html',
  styleUrls: ['./admgenerodetalle.page.scss'],
})
export class AdmGeneroDetallePage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  
  constructor(
    private route: ActivatedRoute,
    private loading : LoadingController
  ) { }

  genero: any = null;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}generos/`;

  ngOnInit(): void {
    this.cargarGenero();
  }

  async cargarGenero() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.url+id,
      withCredentials: true,
      headers: this.headers
    }).then((response) => {
      this.genero = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
