import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { PhotoInterface } from 'src/app/Models/PhotoInterface';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  URL = "http://localhost:5000/api/photos";
  photos: PhotoInterface[] = [];
  handleSearchEvent: EventEmitter<any>;
  onPhotosLoadedEvent: EventEmitter<any>;

  constructor(private httpClient: HttpClient, private errorService: ErrorHandlerService) {
    this.handleSearchEvent = new EventEmitter<any>();
    this.onPhotosLoadedEvent = new EventEmitter<any>();
    this.loadPhotos();
  }

  handleSearch(filterData: Object) {
    this.handleSearchEvent.emit(filterData);
  }

  async loadPhotos() {
    this.photos = await this.getPhotos();
    this.onPhotosLoadedEvent.emit(this.photos);
  }

  async getPhotos() {
    try {
      return await this.httpClient.get<PhotoInterface[]>(`${this.URL}`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }
}
