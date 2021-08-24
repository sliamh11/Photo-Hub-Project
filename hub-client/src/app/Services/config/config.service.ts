import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IView } from 'src/app/Models/IView';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { ICategory } from 'src/app/Models/ICategory';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // Properties
  CONFIG_URL = "http://localhost:5000/api/config";
  PHOTOS_URL = "http://localhost:5000/api/photos";
  private isPrivateModeEnabled = false;
  private isPrivateMode = false;
  onPrivateModeChanged: EventEmitter<boolean>;

  constructor(private httpClient: HttpClient, private errorService: ErrorHandlerService, private router: Router) {
    this.onPrivateModeChanged = new EventEmitter<boolean>();
    this.getPrivateEnabled();
  }

  // Get Requests

  // Check if PrivateMode is allowed in the config file.
  private getPrivateEnabled = async () => {
    try {
      this.isPrivateModeEnabled = await this.httpClient.get<boolean>(`${this.CONFIG_URL}/private-mode`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error)
    }
  }

  isConfigDataExists = async () => {
    try {
      return await this.httpClient.get<boolean>(`${this.CONFIG_URL}/is-data-exists`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  getViews = async () => {
    try {
      return await this.httpClient.get<IView[]>(`${this.CONFIG_URL}/views`).toPromise();
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

  getSelectedView = async () => {
    try {
      return await this.httpClient.get<IView>(`${this.CONFIG_URL}/views/selected-view`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  isCameraAllowed = async () => {
    try {
      return this.httpClient.get<boolean>(`${this.CONFIG_URL}/camera-allowed`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  isLocationAllowed = async () => {
    try {
      return this.httpClient.get<boolean>(`${this.CONFIG_URL}/location-allowed`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  // Post Requests
  postCategories = async (updatedCategories: ICategory[]) => {
    try {
      return await this.httpClient.post<ICategory[]>(`${this.CONFIG_URL}/categories`, updatedCategories).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  postConfiguration = async (config: ConfigModel) => {
    try {
      // If successfully posted the config data, set isPrivateModeEnabled to it's updated value.
      if (await this.httpClient.post(`${this.CONFIG_URL}`, config).toPromise()) {
        this.isPrivateModeEnabled = config.allowPrivateMode;
        return true;
      }
      return false;
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  checkPasswordsMatch = async (password: string) => {
    try {
      const data = {
        password: password
      }
      return await this.httpClient.post(`${this.CONFIG_URL}/match-passwords`, data).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  // Helpers
  getPrivateMode = () => {
    return this.isPrivateModeEnabled ? this.isPrivateMode : false;
  }

  setPrivateMode = (isEnabled: boolean) => {
    if (this.isPrivateModeEnabled) {
      this.isPrivateMode = isEnabled;
      this.onPrivateModeChanged.emit(this.isPrivateMode);
    }
  }
}
