import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  isBtnEnabled : boolean;
  constructor(private router: Router, private uploadService: UploadImageService) {
  }

  handleClickDone() {
    // If src == null --> no photo taken / uploaded by user.
    if (this.uploadService.getCurrentPhoto().src === null) {
      this.router.navigate(["album"]);
    } else {
      this.router.navigate(["photo-info"]);
    }
  }
}
