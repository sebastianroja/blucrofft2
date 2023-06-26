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
  private currentUserId: number = 0;

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

  verifyCredentials(correo: string, password: string): Promise<any> {
    return this.database
      .executeSql('SELECT * FROM cuenta WHERE correo = ? AND password = ?', [correo, password])
      .then(result => {
        if (result.rows.length > 0) {
          return result.rows.item(0);  // Devolver los datos del primer usuario encontrado
        } else {
          return null;  // Devolver null si no se encuentra ningún usuario
        }
      })
      .catch(error => {
        this.presentToast('Error al verificar las credenciales: ' + error);
        throw error;
      });
  }

  getUserData(correo: string): Promise<any> {
    return this.database.executeSql('SELECT nombre, correo FROM cuenta WHERE correo = ?', [correo])
      .then((res) => {
        if (res.rows.length > 0) {
          return {
            nombre: res.rows.item(0).nombre,
            correo: res.rows.item(0).correo
          };
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
      });
  }

  setCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT nombre, correo FROM cuenta WHERE id = ?', [this.currentUserId])
        .then(res => {
          if (res.rows.length > 0) {
            const usuario = {
              nombre: res.rows.item(0).nombre,
              correo: res.rows.item(0).correo
            };
            resolve(usuario);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

   