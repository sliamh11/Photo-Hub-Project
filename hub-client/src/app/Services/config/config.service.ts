import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { View } from 'src/app/Models/View';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { Category } from 'src/app/Models/Category';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // URLs
  CONFIG_URL = "http://localhost:5000/api/config";
  PHOTOS_URL = "http://localhost:5000/api/photos";

  constructor(private httpClient: HttpClient, private errorService : ErrorHandlerService) {
  }

  async isConfigDataExists() {
    try {
      return await this.httpClient.get(`${this.CONFIG_URL}/is-data-exists`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  async getViewsList() {
    try {
      return await this.httpClient.get<View[]>(`${this.CONFIG_URL}/views`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  async getCategories() {
    try {
      return await this.httpClient.get<Category[]>(`${this.CONFIG_URL}/categories`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  async postConfiguration(config: ConfigModel) {
    try {
      return await this.httpClient.post(`${this.CONFIG_URL}`, config).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }
}
