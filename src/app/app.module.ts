import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // ✅ Importa AppRoutingModule

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/enviroment';  // ✅ Verificar la ruta
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,  // ✅ Importa las rutas principales aquí
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // ✅ Inicializa Firebase
    provideAuth(() => getAuth()),                                         // ✅ Provee autenticación
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
