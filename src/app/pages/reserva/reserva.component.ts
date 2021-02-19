import { Component, OnInit } from '@angular/core';
import { HttpService } from "@services/http/http.service";
import { ActivatedRoute,Router,Params } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
declare var $:any;
import * as moment from 'moment';

declare interface reserva{
  id?:number,
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
  reservas : any = [];
  items : any = [];
  body : reserva;
  edit : reserva;
  horaInicio : string;
  horaFin : string;
  public fechaTmp : string;
  public fechaTmp2 : string;
  public showLoading : boolean = false;

  ngOnInit(): void {

    this.obtenerReservas();

    this.http.getHttp("salas")
    .subscribe(data => {
        console.log('salas >',data);
        this.items = data.data;
    });

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

    $('.entradaEdit').datetimepicker({
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
    $('.salidaEdit').datetimepicker({
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
    $('.datetimepickerEdit').datetimepicker({
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
    this.edit = {
      fecha : null,
      hora_inicio : null,
      hora_fin : null,
      motivo : null,
      sala_id : null,
      servicios : null,
    }


  }
  obtenerReservas(){
    this.showLoading = true;
    this.http.getHttp("reservas/")
    .subscribe(data => {
        console.log('reservas >',data);
        this.reservas = data.data;
        this.showLoading = false;
    });
    
  } 

  register(e){
    this.body.servicios = null;
    if(e.target.checked){
      this.body.servicios = "Contratar servicio de catering";
    }
    
  }

  editCheckbox(e){
    this.edit.servicios = null;
    if(e.target.checked){
      this.edit.servicios = "Contratar servicio de catering";
    }
    
  }
  openModal(){
    $('#newReserva').modal('show').fadeIn(500);
  }

  openEditModal(id){
    this.http.getHttp("reservas/"+id)
    .subscribe(data => {
        console.log('editar Reserva >',data);
        this.edit.motivo = data.data.motivo;
        //this.edit.fecha = moment(data.data.fecha).format('DD-MM-YYYY');
        //this.edit.hora_inicio = data.data.hora_inicio.slice(0, 5);
        //this.edit.hora_fin = data.data.hora_fin.slice(0, 5);
        this.edit.sala_id = data.data.sala_id;
        this.edit.id = data.data.id;
        console.log(this.edit);

        
        
       // this.fechaTmp2 = moment(data.data.fecha).format('DD-MM-YYYY');
       
    });

    

    $('#editModal').modal('show').fadeIn(500);
  }
  closeEditModal(){
    $('#editModal').modal('hide').fadeOut(500);
  }
  closeModal(){
    $('#newReserva').modal('hide').fadeOut(500);
  }

  

  public agregarReserva(){

    this.body.fecha =  moment(this.fechaTmp).format("YYYY-MM-DD");
    this.body.hora_inicio =  moment($('.entrada').data("DateTimePicker").viewDate()).format("HH")+":"+moment($('.entrada').data("DateTimePicker").viewDate()).format("mm");
    this.body.hora_fin =  moment($('.salida').data("DateTimePicker").viewDate()).format("HH")+":"+moment($('.salida').data("DateTimePicker").viewDate()).format("mm");
    console.log(this.body);

    
    this.http.postHttp("reservas/",this.body)
    .subscribe(data => {
        console.log(data);
        if(data.data==true){
          this.alert.alertify("top",'right','pe-7s-check', 'La sala se encuentra ocupada', 'danger');
        }
        else{
          this.alert.alertify("top",'right','pe-7s-check', 'Sala reservada', 'success');
        }
        this.closeModal();
        this.obtenerReservas();
    });

  }

  public editarReserva(){

    console.log(this.fechaTmp2);
    this.showLoading = true;

    this.edit.fecha =  moment(this.fechaTmp2).format("YYYY-MM-DD");
    this.edit.hora_inicio =  moment($('.entradaEdit').data("DateTimePicker").viewDate()).format("HH")+":"+moment($('.entradaEdit').data("DateTimePicker").viewDate()).format("mm");
    this.edit.hora_fin =  moment($('.salidaEdit').data("DateTimePicker").viewDate()).format("HH")+":"+moment($('.salidaEdit').data("DateTimePicker").viewDate()).format("mm");
    
    console.log('antes de editar reserva', this.edit);
         
    this.http.putHttp("reservas/"+this.edit.id,this.edit)
    .subscribe(data => {
        console.log(data);
        if(data.data==true){
          this.alert.alertify("top",'right','pe-7s-check', 'La sala se encuentra ocupada', 'danger');
        }
        else{
          this.alert.alertify("top",'right','pe-7s-check', 'La reserva a sido actualizada', 'success');
        }
        this.closeEditModal();
        this.obtenerReservas();
          this.showLoading = true;
    });

  }
  public eliminarReserva(id){
    if(confirm('Desea eliminar esta reserva?')){
    
      this.http.deleteHttp("reservas/"+id)
      .subscribe(data => {
          console.log(data);
          this.alert.alertify("top",'right','pe-7s-check', 'Reserva Eliminada', 'success');
          this.obtenerReservas();
      });
    }
  
  }



}
