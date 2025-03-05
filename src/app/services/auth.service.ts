//servicios para la autentificación desde firebase

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  // Función para iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      alert('Inicio de sesión exitoso.');
      this.router.navigate(['/invoices']);  // Manda tras iniciar sesión a la pantalla 
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      alert('Error: ' + error.message);
    }
  }

  // Función para registrar usuarios
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);  // Lleva al login tras registrarse para iniciar sesion
    } catch (error: any) {
      console.error('Error al registrar:', error.message);
      alert('Error al registrar: ' + error.message);  // error por si acaso
    }
  }

  // Función para cerrar sesión
  async logout() {
    await signOut(this.auth);
    alert('Sesión cerrada.');
    this.router.navigate(['/login']);
  }
  //Método para verificar si hay usuario autenticado
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;  
  }
  
  
  

}
