import { Injectable } from '@angular/core';
import{SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx'

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!: SQLiteObject;

  constructor() { }
}
