import { Component, OnInit } from '@angular/core';
import { HttpService } from "@services/http/http.service";
import { ActivatedRoute,Router,Params } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
declare var $:any;
import * as moment from 'moment';

declare interface reserva{
  fecha: string,
  hora_inicio : string,
  hora_fin : string,
  motivo : string,
  sala_id : number,
  servicios : string,
} 


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  constructor(private http: HttpService, private router: Router, private alert: AlertService, private _route: ActivatedRoute) { }
  reservas: any = [];
  body : reserva;
  
  ngOnInit(): void {

    this.obtenerReservas();

    $('.entrada').datetimepicker({
      format: 'LT',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
    $('.salida').datetimepicker({
      format: 'LT',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
    
    $('.datetimepicker').datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        },
        format: 'DD-MM-YYYY',
        locale: 'es'
    });
   

    this.body = {
      fecha : null,
      hora_inicio : null,
      hora_fin : null,
      motivo : null,
      sala_id : null,
      servicios : null,
    }


  }
  obtenerReservas(){
    this.http.getHttp("reservas/")
    .subscribe(data => {
        console.log('reservas >',data);
        this.reservas = data.data;
    });
    
  } 

  openModal(){
    $('#newReserva').modal('show').fadeIn(500);
  }

  closeModal(){
    $('#newReserva').modal('hide').fadeOut(500);
  }

  public agregarReserva(){

    console.log(this.body);

    
    /*this.http.postHttp("reservas/",this.body)
    .subscribe(data => {
        console.log(data);
        this.closeModal();
        this.obtenerSalas();
    });*/

  }

}
