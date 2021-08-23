import { Component } from '@angular/core';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-local-machine',
  templateUrl: './local-machine.component.html',
  styleUrls: ['./local-machine.component.css']
})
export class LocalMachineComponent {

  source: FormControl;
  test: any;
  value: any;
  imgPath: any;
  imgUrl: any;

  constructor(private uploadService: UploadImageService, private snackBar: MatSnackBar) {
    this.source = new FormControl(null, Validators.required);
  }

  readFilePath() {
    // If source is null / undefined.
    if (!this.source) {
      return;
    }

    // Image type validation
    let imgType = this.source.value.type;
    if (imgType.match(/image\/*/) == null) {
      this.snackBar.open("Only images are allowed, last image is applied.", "Ok");
      return;
    }

    // Read image and save its URL.
    const reader = new FileReader();
    this.imgPath = this.source.value.name;
    reader.readAsDataURL(this.source.value);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
      this.uploadService.setCurrentPhotoSource(this.imgUrl);
    }
  }
}
