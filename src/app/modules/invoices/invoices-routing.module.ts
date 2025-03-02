import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  { path: '', component: InvoicesListComponent },
  { path: 'add', component: AddInvoiceComponent },
  { path: 'edit/:id', component: EditInvoiceComponent },
  { path: 'detail/:id', component: InvoiceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
