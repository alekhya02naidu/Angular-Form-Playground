import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {

  constructor() {
    this.showInteger();
   }

  showInteger(): Number{
    return 1;
  }
}
