import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { InvoiceListComponent } from './modules/invoices/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './modules/invoices/invoice-form/invoice-form.component';
import { InvoiceEditComponent } from './modules/invoices/invoice-edit/invoice-edit.component';
import { ProjectListComponent } from './modules/projects/project-list/project-list.component';
import { ProjectFormComponent } from './modules/projects/project-form/project-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/add', component: InvoiceFormComponent },
  { path: 'invoices/edit/:id', component: InvoiceEditComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/add', component: ProjectFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'login' }
];

