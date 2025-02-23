import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { InvoicesListComponent } from './modules/invoices/invoices-list/invoices-list.component';
import { AddInvoiceComponent } from './modules/invoices/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './modules/invoices/edit-invoice/edit-invoice.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'invoices', component: InvoicesListComponent },
  { path: 'invoices/add', component: AddInvoiceComponent },
  { path: 'invoices/edit/:id', component: EditInvoiceComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'login' }
];

