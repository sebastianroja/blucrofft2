import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/dbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {}

  register() {
    if (this.nombre && this.correo && this.password) {
      this.dbService.insertAccount(this.nombre, this.correo, this.password)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
        });
    }
  }
}
