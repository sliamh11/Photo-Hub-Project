import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/ICategory';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.css']
})
export class PhotoInfoComponent {

  categories: ICategory[];
  photoModel: PhotoModel;

  constructor(private uploadService: UploadImageService, private router: Router, private snackBar: MatSnackBar) {
    this.photoModel = new PhotoModel();
    this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.uploadService.getCategories();
  }

  async handleClickNext() {
    try {
      let result = await this.uploadService.postSavePhoto(this.photoModel);
      if (result) {
        this.router.navigate(["album"]);
      } else {
        this.snackBar.open(`Something bad happened.`, "Ok");
      }

    } catch (error) {
      this.snackBar.open(`${error.message}`, "Ok");
    }

  }
}