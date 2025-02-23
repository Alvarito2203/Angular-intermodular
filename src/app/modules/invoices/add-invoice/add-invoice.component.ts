import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // ✅ Importar CommonModule si se usa *ngIf

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ✅ Importaciones necesarias
})
export class AddInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      fecha: ['', Validators.required],
      total: ['', [Validators.required, Validators.min(0.01)]],
      tipo: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const { tipo, ...invoiceData } = this.invoiceForm.value;
      const collectionName = tipo === 'emitida' ? 'facturas_emitidas' : 'facturas_recibidas';

      this.invoiceService.addInvoice(collectionName, invoiceData).then(() => {
        alert('Factura agregada correctamente.');
        this.router.navigate(['/invoices']);
      }).catch(error => {
        console.error('Error al agregar factura:', error);
        alert('Ocurrió un error al agregar la factura.');
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
