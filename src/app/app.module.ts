import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/enviroment';  // ✅ Verificar la ruta
import { InvoicesModule } from './modules/invoices/invoices.module'; // ✅ Ruta correcta

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,  // ✅ Rutas principales
    InvoicesModule,    // ✅ Módulo de facturas con rutas hijas
    AppComponent,      // ✅ Importa el componente standalone
  
    BrowserModule,
    AppRoutingModule,  // ✅ Rutas principales
    InvoicesModule,    // ✅ Módulo de facturas con rutas hijas
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // ✅ Inicializa Firebase
    provideAuth(() => getAuth()),  // ✅ Autenticación Firebase
  ],
})
export class AppModule {}
