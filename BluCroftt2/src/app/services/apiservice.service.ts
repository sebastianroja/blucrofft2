import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.shipit.cl/v/regions';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveFuga(fuga: any): Observable<any> {
    const storedFugas = localStorage.getItem('fugas');
    let fugas = storedFugas ? JSON.parse(storedFugas) : [];
    fugas.push(fuga);
    localStorage.setItem('fugas', JSON.stringify(fugas));

    return of({ success: true });
  }

  getFugas(): Observable<any[]> {
    const storedFugas = localStorage.getItem('fugas');
    const fugas = storedFugas ? JSON.parse(storedFugas) : [];
    return of(fugas);
  }

  getTodasLasRegiones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDireccionesPorRegion(regionId: number): Observable<any> {
    const apiUrl = `https://api.shipit.cl/v/regions/${regionId}/addresses`;
    return this.http.get<any>(apiUrl);
  }

  saveLocation(location: any): Observable<any> {
    const storedLocations = localStorage.getItem('locations');
    let locations = storedLocations ? JSON.parse(storedLocations) : [];
    locations.push(location);
    localStorage.setItem('locations', JSON.stringify(locations));
  
    return of({ success: true });
  }

  getLocations(): any[] {
    const storedLocations = localStorage.getItem('locations');
    return storedLocations ? JSON.parse(storedLocations) : [];
  }
}
