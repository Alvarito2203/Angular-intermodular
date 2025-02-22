import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,     
    RegisterComponent,
    ReactiveFormsModule,  // ✅ Importante para que formGroup funcione
   
  ],
})
export class AuthModule {}
