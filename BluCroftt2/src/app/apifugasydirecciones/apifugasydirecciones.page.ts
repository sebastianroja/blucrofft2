import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiservice.service';

@Component({
  selector: 'app-apifugasydirecciones',
  templateUrl: './apifugasydirecciones.page.html',
  styleUrls: ['./apifugasydirecciones.page.scss'],
})
export class ApifugasydireccionesPage implements OnInit {

  regiones: any;
  fugas: any[] = [];
  selectedRegion: any;
  storedAddress: string = '';
  filteredDirecciones: string[] = [];
  selectedRegionId: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRegiones();
    this.getLocations();
    this.retrieveStoredAddress();
  }

  getRegiones() {
    this.api.getTodasLasRegiones().subscribe((data) => {
      this.regiones = data;
    });
  }
  

  getLocations() {
    this.fugas = this.api.getLocations();
    
  }

  ionViewWillEnter() {
    this.getRegiones();
    this.getLocations();
    this.retrieveStoredAddress();
  }

  retrieveStoredAddress() {
    this.storedAddress = localStorage.getItem('address') || '';
  }

  getDireccionPorRegion(regionId: number): string {
    const location = this.fugas.find((fuga: any) => fuga.regionId === regionId);
    return location ? location.address : '';
  }
  
  filterDireccionesByRegion() {
    this.filteredDirecciones = this.fugas
      .filter((fuga: any) => fuga.regionId === this.selectedRegionId)
      .map((fuga: any) => fuga.address);
  }
}
