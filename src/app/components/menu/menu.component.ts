import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(
    private rout: Router
  ) {
  }

  nombre: any = localStorage.getItem('username');

  ngOnInit() { }


  logout() {
    localStorage.clear();
    this.rout.navigate(['/login']);
  }


}
