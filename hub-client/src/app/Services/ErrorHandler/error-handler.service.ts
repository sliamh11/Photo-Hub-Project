import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  // Handle error messages, mainly from server.
  handleError = (error) => {
    if (error.error && typeof error.error === "string") {
      throw new Error(error.error);
    } else {
      throw new Error(`Code ${error.status}: Something bad happened, please try again later.`);
    }
  }
}
