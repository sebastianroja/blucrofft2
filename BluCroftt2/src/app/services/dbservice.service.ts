import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public database!: SQLiteObject;
  tablaCuenta: string = "CREATE TABLE IF NOT EXISTS cuenta(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, correo TEXT, password TEXT);";
  listaCuentas = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.createDB();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchCuentas(): Observable<any[]> {
    return this.listaCuentas.asObservable();
  }

  createDB() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'mydb.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.createTables();
        })
        .catch(error => {
          this.presentToast('Error al crear la base de datos: ' + error);
        });
    });
  }

  async createTables() {
    try {
      await this.database.executeSql(this.tablaCuenta, []);
      this.isDBReady.next(true);
    } catch (error) {
      this.presentToast('Error al crear la tabla: ' + error);
    }
  }

  insertAccount(nombre: string, correo: string, password: string): Promise<void> {
    return this.database
      .executeSql('INSERT INTO cuenta (nombre, correo, password) VALUES (?, ?, ?)', [nombre, correo, password])
      .then(() => {
        this.presentToast('Usuario registrado');
      })
      .catch(error => {
        this.presentToast('Error al insertar cuenta: ' + error);
        throw error;
      });
  }

  verifyCredentials(correo: string, password: string): Promise<boolean> {
    return this.database
      .executeSql('SELECT * FROM cuenta WHERE correo = ? AND password = ?', [correo, password])
      .then(result => {
        return result.rows.length > 0;
      })
      .catch(error => {
        this.presentToast('Error al verificar las credenciales: ' + error);
        throw error;
      });
  }
}