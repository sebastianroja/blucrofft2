import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/dbservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(
    private dbService: DbService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  login() {
    if (this.correo && this.password) {
      this.dbService
        .verifyCredentials(this.correo, this.password)
        .then((user) => {
          if (user) {
            // Usuario encontrado
            this.showAlert('Usuario encontrado');
            // Establecer el ID del usuario actual
            this.dbService.setCurrentUserId(user.id);
            // Navegar a la página principal u otra página deseada
            this.router.navigate(['/home']);
          } else {
            // Usuario no encontrado
            this.showAlert('Usuario no encontrado');
          }
        })
        .catch((error) => {
          console.error('Error al verificar credenciales:', error);
        });
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
