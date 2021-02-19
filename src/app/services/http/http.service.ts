import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from '@env/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as urljoin from "url-join";

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private router:Router, private httpClient:HttpClient, private toastr: ToastrService) { }

  base_api: string = environment.url_api;
  options: any;


  //headers: any = {headers: {'Authorization': "Bearer " + localStorage.getItem("token")}}

  getHttp(url_parameter: string, options?:any): Observable<any>{

    if(options)
      this.options=options;

    return this.httpClient.get(urljoin(this.base_api,url_parameter),options)
    .pipe(
      catchError(
        this.handleError.bind(this)
      )
    );

  }

  postHttp(url_parameter: string, parameters: any, options?:any): Observable<any>{

    //console.log(urljoin(this.base_api,url_parameter));
    if(options)
      this.options=options;

    return this.httpClient.post(urljoin(this.base_api,url_parameter),parameters)
    .pipe(
      catchError(
        this.handleError.bind(this)
      )
    );
  }

  putHttp(url_parameter: string, parameters: any, options?:any): Observable<any>{
    if(options)
      this.options=options;

    return this.httpClient.put(urljoin(this.base_api,url_parameter),parameters)
    .pipe(
       // retry a failed request up to 3 times
      catchError(
        this.handleError.bind(this)
      )
    );
  }

  deleteHttp(url_parameter: string): Observable<any>{
    
    return this.httpClient.delete(urljoin(this.base_api,url_parameter))
    .pipe(
        catchError(
      this.handleError.bind(this)
      )
    );
  }



  handleError(error: HttpErrorResponse) {

    if(this.options){
      this.options.disabled=false;
      this.options.isLoading=false;
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toastr.error("",'Error inesperado');
      return throwError(
      'Something bad happened; please try again later.');
    } else {

      if(error.status==422){
          var strHtml = "<ul>";
          for(let i=0; i < error.error.errors.length; i++ ){
            let msg = error.error.errors[i];
            strHtml+="<li>"+msg+"</li>";
          }
          strHtml+="</ul>";

          this.toastr.error(strHtml,'Existen errores en tu formulario', {
            closeButton: false,
            enableHtml: true
          });
          return throwError(
          'Something bad happened; please try again later.');

      }

      if(error.status==401){
          this.router.navigate(['/login'])
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.toastr.error("Vuelva a iniciar sesión",'Sesión expirada');
          return throwError(
          'Something bad happened; please try again later.');
      }

      if(error.status==404){
          this.toastr.error("",'Recurso no encontrado');
          return throwError(
          'Something bad happened; please try again later.');
      }

      if(error.status==400){

         if(error.error.error)
           this.toastr.error("",error.error.error);
         else
           this.toastr.error("No se pudo procesar su transacción",'Error');

        return throwError(
        'Something bad happened; please try again later.');
      }

      if(error.status==500){
        this.toastr.error("",'Hubo un error inesperado');
        return throwError(
        'Something bad happened; please try again later.');
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };  

}
