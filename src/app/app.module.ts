import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { BindingComponent } from './Components/binding/binding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreepointAfterPipe } from './Pipes/treepoint-after.pipe';
import { MenuComponent } from './Components/menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MainComponent } from './Components/mainContent/mainContent.component';
import { TransferComponent } from './Components/transfer/transfer.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";

initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BindingComponent,
    TreepointAfterPipe,
    MenuComponent,
    MainComponent,
    TransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }







