import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import configDev from '../../assets/config/config.dev.json';
import configProd from '../../assets/config/config.prod.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static settings: any;
  constructor() {}
  load() {

    // Read configuration file based on environment
    if (environment.production) {
      ConfigService.settings = configDev;
    } else {
      ConfigService.settings = configProd;
    }
  }
}
