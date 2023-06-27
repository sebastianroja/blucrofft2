import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage {

  constructor(private alertController: AlertController) { }

  async submitForm() {
   

   
    const alert = await this.alertController.create({
      header: '¡Envío Exitoso!',
      message: 'Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.',
      buttons: ['OK']
    });

    await alert.present();

   
    const inputs = document.querySelectorAll('ion-input');
    inputs.forEach((input: any) => {
      input.value = '';
    });

    const textarea = document.querySelector('ion-textarea');
    if (textarea) {
      textarea.value = '';
    }
  }

}