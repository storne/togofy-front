import { Component, OnInit } from '@angular/core';
import { HttpService } from "@services/http/http.service";
import { ActivatedRoute,Router,Params } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";

declare var $:any;

declare interface body{
  nombre : string;
  descripcion : string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  active : any;
  items : any = [];
  body : body;

  constructor( private http: HttpService, private router : Router, private alert: AlertService, private _route: ActivatedRoute  ) { }

  ngOnInit(): void {

    this.obtenerSalas();

    this.body={
      nombre: null,
      descripcion : null
    }

  }

  public obtenerSalas(){
    this.http.getHttp("salas")
    .subscribe(data => {
        console.log('salas >',data);
        this.items = data.data;
    });
  } 


  openModal(){
    $('#newsala').modal('show').fadeIn(500);
  }

  closeModal(){
    $('#newsala').modal('hide').fadeOut(500);
  }

  public agregarSala(){

    console.log(this.body);

    
    this.http.postHttp("salas/",this.body)
    .subscribe(data => {
        console.log(data);
        this.closeModal();
        this.obtenerSalas();
    });

  }

  public reservarSala(){

  }

  public eliminarSala(id){
    if(confirm('Desea eliminar esta sala?')){
    
      this.http.deleteHttp("salas/"+id)
      .subscribe(data => {
          console.log(data);
          this.obtenerSalas();
      });
    }
  
  }

}
