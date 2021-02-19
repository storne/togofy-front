import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from "@services/http/http.service";
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from "@services/alert/alert.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReservaComponent } from './pages/reserva/reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
  ],
  providers: [
    HttpService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
