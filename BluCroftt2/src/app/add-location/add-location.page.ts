import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage {
  address: string = '';
  selectedRegionId: number = 0;
  regions: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ionViewDidEnter() {
    this.loadRegions();
  }

  loadRegions() {
    this.apiService.getRegions().subscribe((data) => {
      this.regions = data;
    });
  }

  saveLocation() {
    const location = {
      address: this.address,
      regionId: this.selectedRegionId
    };

    this.apiService.saveLocation(location);

    // Almacenar la dirección en el almacenamiento local
    localStorage.setItem('address', this.address);

    this.router.navigate(['/apifugasydirecciones'], { queryParams: { address: this.address, regionId: this.selectedRegionId } });
  }
  
}
