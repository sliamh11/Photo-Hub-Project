import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/ICategory';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.css']
})
export class PhotoInfoComponent {

  categories: ICategory[];
  photoModel: PhotoModel;

  constructor(private uploadService: UploadImageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.photoModel = new PhotoModel();
    this.loadCategories();
  }

  loadCategories = async () => {
    this.categories = await this.uploadService.getCategories();
  }

  handleClickNext = async () => {
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

  openLocationDialog = () => {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      data: this.photoModel.location
    });

    dialogRef.afterClosed().subscribe((location) => {
      console.log(location);
      
      this.photoModel.location = location.data;
    });
  }

}