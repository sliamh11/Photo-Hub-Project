import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { PhotoInterface } from 'src/app/Models/PhotoInterface';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { ConfigService } from '../config/config.service';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  URL = this.configService.PHOTOS_URL;
  photos: PhotoInterface[] = [];
  handleSearchEvent: EventEmitter<any>;
  onPhotosUpdatedEvent: EventEmitter<any>;

  constructor(private httpClient: HttpClient, private errorService: ErrorHandlerService, private configService: ConfigService) {
    this.handleSearchEvent = new EventEmitter<any>();
    this.onPhotosUpdatedEvent = new EventEmitter<any>();
    this.loadPhotos();
  }

  handleSearch = (filterData: Object) => {
    this.handleSearchEvent.emit(filterData);
  }

  loadPhotos = async () => {
    this.photos = await this.getPhotos();
    this.onPhotosUpdatedEvent.emit(this.photos);
  }

  updatePhoto = (updatedPhoto: PhotoModel, fileName: string) => {
    try {
      const data = {
        updatedPhoto: updatedPhoto,
        fileName: fileName
      };

      this.httpClient.put(`${this.URL}`, data).subscribe(() => {
        this.loadPhotos();
      });
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }

  getPhotos = async () => {
    try {
      return await this.httpClient.get<PhotoInterface[]>(`${this.URL}`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }
}
