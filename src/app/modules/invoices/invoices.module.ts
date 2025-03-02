import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { RouterModule } from '@angular/router';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,           // ✅ Necesario para directivas como *ngFor y *ngIf
        // ✅ Para formularios reactivos
    InvoicesRoutingModule,  // ✅ Manejo de rutas internas
    InvoicesListComponent,  // ✅ Importar el componente standalone
    AddInvoiceComponent,
    EditInvoiceComponent,
      FormsModule,
      InvoiceDetailComponent,
      
  
    CommonModule,           // ✅ Necesario para directivas como *ngFor y *ngIf
    // ✅ Para formularios reactivos
    InvoicesRoutingModule,  // ✅ Manejo de rutas internas
    RouterModule,          // ✅ Necesario para router.navigate
    
  ],
})
export class InvoicesModule {}
