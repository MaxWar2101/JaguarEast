import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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

  personal: any = null;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token' };
  url: string = `${environment.apiUrl}personals/${localStorage.getItem('id')}?expand=perFkgenero`;

  ngOnInit(): void {
    this.cargarPersonal();
  }

  async cargarPersonal() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loading.create({
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
      this.personal = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
