import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/Models/IPhoto';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { IView } from 'src/app/Models/IView';
import { ConfigService } from '../config/config.service';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';
import { UploadImageService } from '../UploadImage/upload-image.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit {

  URL = this.configService.PHOTOS_URL;
  photos: IPhoto[] = [];
  handleSearchEvent: EventEmitter<any>;
  onPhotosUpdatedEvent: EventEmitter<IPhoto[]>;
  onFavoriteModeChanged: EventEmitter<boolean>;
  onViewModeChanged: EventEmitter<IView>;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorHandlerService,
    private configService: ConfigService,
    private uploadService: UploadImageService
  ) {
    this.handleSearchEvent = new EventEmitter<any>();
    this.onPhotosUpdatedEvent = new EventEmitter<IPhoto[]>();
    this.onFavoriteModeChanged = new EventEmitter<boolean>();
    this.onViewModeChanged = new EventEmitter<IView>();
    this.loadPhotos();
  }

  ngOnInit(): void {
    // Called when a new photo has been uploaded.
    this.uploadService.onPhotoUploaded.subscribe(() => {
      this.loadPhotos();
    });
  }

  handleSearch = (filterData: Object) => {
    // Called when user clicks on Search Button is search component.
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
      return await this.httpClient.get<IPhoto[]>(`${this.URL}`).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }
}
