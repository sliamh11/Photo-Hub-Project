import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from 'src/app/Services/config/config.service';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  @ViewChild("video") video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  captures: any[];
  error: any;
  isChosen: boolean;
  currentCaptureIndex: number;

  VIDEO_WIDTH = 480;
  VIDEO_HEIGHT = 360;

  constructor(private configService: ConfigService, private service: UploadImageService, private snackBar : MatSnackBar) {
    this.captures = []
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  // NOT DONE
  async setupDevices() {
    // Add here - if config allows camera == true:
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) { // stream && allow camera checkbox.
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.snackBar.open("You have no output video device", "Ok");
        }
      } catch (e) {
        this.snackBar.open(`Error: ${e.message}`, "Ok");
      }
    }
    // else...
  }

  capture() {
    try {
      this.drawImageToCanvas(this.video.nativeElement);
      let imgUrl = this.canvas.nativeElement.toDataURL("image/png");
      let imgId = this.captures.length;
      let currImage = { id: imgId, url: imgUrl };
      this.captures.push(currImage);
  
      if (!this.isChosen) {
        this.currentCaptureIndex = currImage.id;
        this.service.setCurrentPhotoSource(currImage.url);
      }
    } catch (error) {
      this.snackBar.open(`Error: ${error.message}`);
    }
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.VIDEO_WIDTH, this.VIDEO_HEIGHT);
  }

  imageClicked(e) {
    this.isChosen = true;
    this.currentCaptureIndex = parseInt(e.target.attributes.id.value);
    this.service.setCurrentPhotoSource(this.captures[this.currentCaptureIndex].url)
  }
}
