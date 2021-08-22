import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class OnlineImageComponent implements OnInit {

  photosList: any[] = [];
  pageNumber = 1;
  photosPerPage = 20;
  searchQuery: string = "";
  chosenPhoto: string = ""; // To identify the selected photo

  constructor(private httpClient: HttpClient,
    private uploadService: UploadImageService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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

  handlePhotoSelected = async (src: string) => {
    try {
      this.chosenPhoto = src;
      this.uploadService.setCurrentPhotoSource(await this.getBase64FromUrl(src));
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }

  // Get the image in a normal URL address and convert it to Base64.
  getBase64FromUrl: any = async (url: string) => {
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
