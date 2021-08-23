import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { ConfigService } from '../config/config.service';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private URL = this.configService.PHOTOS_URL;
  private currentPhoto: PhotoModel; // State of the current photo to upload.

  constructor(private configService: ConfigService,
    private httpClient: HttpClient,
    private errorService: ErrorHandlerService) {
    this.currentPhoto = new PhotoModel();
  }

  setCurrentPhotoSource = (imageSrc: string) => {
    this.currentPhoto.src = imageSrc;
  }

  setCurrentPhotoData = (photo: PhotoModel) => {
    photo.src = this.currentPhoto.src;
    this.currentPhoto = photo;
  }

  getCurrentPhoto = (): PhotoModel => {
    return this.currentPhoto;
  }

  postSavePhoto = async (photo: PhotoModel) => {
    try {
      this.setCurrentPhotoData(photo);
      return await this.httpClient.post(`${this.URL}`, this.currentPhoto).toPromise();
    } catch (error) {
      throw this.errorService.handleError(error);
    }
  }
}
