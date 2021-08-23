import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageService } from 'src/app/Services/UploadImage/upload-image.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '563492ad6f9170000100000154b69cdfc896438bbbdacfc7061bf9a0'
  })
}

@Component({
  selector: 'app-online-image',
  templateUrl: './online-image.component.html',
  styleUrls: ['./online-image.component.css']
})
export class OnlineImageComponent {

  photosList: any[];
  pageNumber: number;
  photosPerPage: number;
  searchQuery: string;
  chosenPhoto: string; // To identify the selected photo

  constructor(private httpClient: HttpClient,
    private uploadService: UploadImageService,
    private snackBar: MatSnackBar
  ) {
    this.photosList = [];
    this.pageNumber = 1;
    this.photosPerPage = 20;
    this.searchQuery = "";
    this.chosenPhoto = "";
  }

  handleSearch = (query: string) => {
    this.pageNumber = 1;
    this.searchQuery = query;
    this.getPhotos().subscribe((data) => {
      this.photosList = data.photos;
    });
  }

  getPhotos = () => {
    const url = `https://api.pexels.com/v1/search?query=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.photosPerPage}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  handlePhotoSelected = async (src: string) => {
    try {
      this.chosenPhoto = src;
      this.uploadService.setCurrentPhotoSource(await this.getBase64FromUrl(src));
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }

  // Move to the next page.
  handleNextPage = () => {
    try {
      this.pageNumber += 1;
      this.getPhotos().subscribe((data) => {
        this.photosList = data.photos;
      });
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }

  // Move to the previous page.
  handleLastPage = () => {
    try {
      if (this.pageNumber > 1) {
        this.pageNumber -= 1;
        this.getPhotos().subscribe((data) => {
          this.photosList = data.photos;
        });
      }
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }

  // Get the image inside a normal URL address and convert it to Base64.
  getBase64FromUrl = async (url: string): Promise<any> => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((res, rej) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          return res(base64data);
        }
      } catch (error) {
        return rej(error);
      }
    });
  }

}
