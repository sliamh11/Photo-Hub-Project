import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error) {
    if (error.error) {
      throw new Error(error.error);
    } else {
      throw new Error(`Code ${error.status}: Something bad happened, please try again later.`);
    }

  }
}
