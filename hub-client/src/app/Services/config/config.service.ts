import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { View } from 'src/app/Models/View';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { ICategory } from 'src/app/Models/ICategory';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // URLs
  CONFIG_URL = "http://localhost:5000/api/config";
  PHOTOS_URL = "http://localhost:5000/api/photos";

  constructor(private httpClient: HttpClient, private errorService: ErrorHandlerService) {
  }

  isConfigDataExists = async () => {
    try {
      return await this.httpClient.get(`${this.CONFIG_URL}/is-data-exists`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  getViewsList = async () => {
    try {
      return await this.httpClient.get<View[]>(`${this.CONFIG_URL}/views`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  getCategories = async () => {
    try {
      return await this.httpClient.get<ICategory[]>(`${this.CONFIG_URL}/categories`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  postCategories = async (updatedCategories: ICategory[]) => {
    try {
      return await this.httpClient.post<ICategory[]>(`${this.CONFIG_URL}/categories`, updatedCategories).toPromise();
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
