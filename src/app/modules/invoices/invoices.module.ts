import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

@NgModule({
  imports: [
    CommonModule,           // ✅ Necesario para directivas como *ngFor y *ngIf
    ReactiveFormsModule,    // ✅ Para formularios reactivos
    InvoicesRoutingModule,  // ✅ Manejo de rutas internas
    InvoicesListComponent,  // ✅ Importar el componente standalone
  
    CommonModule,           // ✅ Necesario para directivas como *ngFor y *ngIf
    ReactiveFormsModule,    // ✅ Para formularios reactivos
    InvoicesRoutingModule,  // ✅ Manejo de rutas internas
  ],
})
export class InvoicesModule {}
