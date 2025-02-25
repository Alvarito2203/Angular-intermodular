import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      fecha: [null, Validators.required],
      emisor: ['', [Validators.required, Validators.minLength(2)]],
      receptor: ['', [Validators.required, Validators.minLength(2)]],
      baseImponible: [null, [Validators.required, Validators.min(0)]],
      iva: [21, Validators.required],  // IVA predeterminado al 21%
      tipo: ['emitida', Validators.required],  // Predeterminado a 'emitida'
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.value;

      // Calcular el total con IVA
      const ivaPercentage = Number(formData.iva) / 100;
      const total = formData.baseImponible + formData.baseImponible * ivaPercentage;

      // Generar un ID único para la factura
      const invoiceId = this.generateUniqueId();

      // Armar la estructura de la factura
      const invoiceData = {
        id: invoiceId,
        fecha: formData.fecha,
        emisor: formData.emisor,
        receptor: formData.receptor,
        baseImponible: formData.baseImponible,
        iva: ivaPercentage,
        tipo: formData.tipo.toLowerCase(),  // Convertir a minúsculas para consistencia
        total: parseFloat(total.toFixed(2)),  // Redondear a 2 decimales
      };

      const collectionName = formData.tipo.toLowerCase() === 'emitida' ? 'facturas_emitidas' : 'facturas_recibidas';

      // Guardar en Firebase
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

  // Generador simple de ID único
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
