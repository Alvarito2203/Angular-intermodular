import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "tarea-facturas", appId: "1:999073656309:web:4ad2d2ed16d95c344904bc", storageBucket: "tarea-facturas.firebasestorage.app", apiKey: "AIzaSyAD6pMi5-NpjdDErUv_xkXqSzcl4mR0aWc", authDomain: "tarea-facturas.firebaseapp.com", messagingSenderId: "999073656309" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
