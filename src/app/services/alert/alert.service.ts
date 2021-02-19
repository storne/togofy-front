import { Injectable } from '@angular/core';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
 
  alertify(from, align, icon,message, colorType) {
      $.notify({
          icon: icon,
          message: message
      },{
          type: colorType,
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
}

