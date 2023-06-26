import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';
import { DbService } from '../services/dbservice.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('zoomAnimation', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      transition(':enter', [
        animate('500ms', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  @ViewChild('square', { static: true }) square!: ElementRef;

  nombre: string = '';
  correo: string = '';
  showOptions: boolean = false;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this.dbService.getCurrentUser()
      .then((usuario) => {
        if (usuario) {
          this.nombre = usuario.nombre;
          this.correo = usuario.correo;
        } else {
          // El usuario no está registrado o no ha iniciado sesión
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }

  ionViewDidEnter() {
    this.startAnimation();
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  startAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.square.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red' },
        { offset: 0.72, background: 'var(--background)' },
        { offset: 1, background: 'green' }
      ]);

    animation.play();
  }
}