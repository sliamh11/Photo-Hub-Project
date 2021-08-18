import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Code ${error.status}: Something bad happened, please try again later.`);
    }
    // if (error.statusText) {
    //   throw new Error(error.statusText);
    // } else {
    //   throw new Error(`Code ${error.status}: Something bad happened, please try again later.`);
    // }
  }
}
