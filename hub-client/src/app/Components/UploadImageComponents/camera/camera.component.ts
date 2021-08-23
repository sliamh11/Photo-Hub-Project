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
  @ViewChild("video") videoRef: ElementRef;
  @ViewChild('canvas') canvasRef: ElementRef;

  captures: any[];
  error: any;
  isChosen: boolean;
  currentCaptureIndex: number;

  VIDEO_WIDTH = 480;
  VIDEO_HEIGHT = 360;

  constructor(private configService: ConfigService, private service: UploadImageService, private snackBar: MatSnackBar) {
    this.captures = []
  }

  ngAfterViewInit = async () => {
    await this.setupDevices();
  }

  setupDevices = async () => {
    try {
      if (this.configService.isCameraAllowed()) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
          if (stream) {
            this.videoRef.nativeElement.srcObject = stream;
            this.videoRef.nativeElement.play();
            this.error = null;
          } else {
            this.snackBar.open("You have no output video device", "Ok");
          }
        }
      } else {
        this.snackBar.open("Camera is not enabled.", "Ok");
      }
    } catch (e) {
      this.snackBar.open(`Error: ${e.message}`, "Ok");
    }
  }

  capture = () => {
    try {
      this.drawImageToCanvas(this.videoRef.nativeElement);
      let imgUrl = this.canvasRef.nativeElement.toDataURL("image/png");
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

  drawImageToCanvas = (image: any) => {
    this.canvasRef.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.VIDEO_WIDTH, this.VIDEO_HEIGHT);
  }

  imageClicked = (e) => {
    this.isChosen = true;
    this.currentCaptureIndex = parseInt(e.target.attributes.id.value);
    this.service.setCurrentPhotoSource(this.captures[this.currentCaptureIndex].url)
  }
}
