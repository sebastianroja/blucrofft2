import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiservice.service';

@Component({
  selector: 'app-apifugasydirecciones',
  templateUrl: './apifugasydirecciones.page.html',
  styleUrls: ['./apifugasydirecciones.page.scss'],
})
export class ApifugasydireccionesPage implements OnInit {

  regiones: any;
  fugas: any;
  selectedRegion: any;
  storedAddress: string = '';
  filteredDirecciones: string[] = [];
  selectedRegionId: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRegiones();
    this.getFugas();
    this.retrieveStoredAddress();
  }

  getRegiones() {
    this.api.getTodasLasRegiones().subscribe((data) => {
      this.regiones = data;
    });
  }
  

  getFugas() {
    this.api.getFugas().subscribe((data) => {
      this.fugas = data;
    });
  }

  ionViewWillEnter() {
    this.getRegiones();
    this.getFugas();
    this.retrieveStoredAddress();
    
  }

  retrieveStoredAddress() {
    this.storedAddress = localStorage.getItem('address') || '';
  }
  getLocations(): any[] {
    const storedLocations = localStorage.getItem('locations');
    return storedLocations ? JSON.parse(storedLocations) : [];
  }

  
  filterDireccionesByRegion() {
    const locations = this.api.getLocations();
    this.filteredDirecciones = locations
      .filter((loc: any) => loc.regionId === this.selectedRegionId)
      .map((loc: any) => loc.address);
  }
  getDireccionPorRegion(regionId: number): string {
    const locations = this.api.getLocations();
    const location = locations.find((loc: any) => loc.regionId === regionId);
    return location ? location.address : '';
  }
  
}





