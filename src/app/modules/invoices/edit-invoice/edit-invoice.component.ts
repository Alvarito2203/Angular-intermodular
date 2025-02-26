import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  standalone: true,
imports: [CommonModule, ReactiveFormsModule]
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceId!: string;
  invoiceType!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.invoiceForm = this.fb.group({
      fecha: [null, Validators.required],
      emisor: ['', [Validators.required, Validators.minLength(2)]],
      receptor: ['', [Validators.required, Validators.minLength(2)]],
      baseImponible: [null, [Validators.required, Validators.min(0)]],
      iva: [21, Validators.required],
      tipo: ['emitida', Validators.required],
    });
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id')!;
    this.invoiceType = this.route.snapshot.paramMap.get('type')!;

    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      const invoice = invoices.find(inv => inv.id === this.invoiceId);
      if (invoice) {
        this.invoiceForm.patchValue({
          fecha: invoice.fecha,
          emisor: invoice.emisor,
          receptor: invoice.receptor,
          baseImponible: invoice.baseImponible,
          iva: invoice.iva * 100,  // Convertir IVA decimal a porcentaje
          tipo: invoice.tipo,
        });
      }
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.value;
      const ivaDecimal = Number(formData.iva) / 100;
      const total = formData.baseImponible + formData.baseImponible * ivaDecimal;

      const updatedInvoice = {
        fecha: formData.fecha,
        emisor: formData.emisor,
        receptor: formData.receptor,
        baseImponible: formData.baseImponible,
        iva: ivaDecimal,
        tipo: formData.tipo.toLowerCase(),
        total: parseFloat(total.toFixed(2)),
      };

      this.invoiceService.updateInvoice(this.invoiceId, updatedInvoice).then(() => {
        alert('✅ Factura actualizada correctamente.');
        this.router.navigate(['/invoices']);
      }).catch((error) => {
        console.error('❌ Error al actualizar factura:', error);
        alert('Ocurrió un error al actualizar la factura.');
      });
    } else {
      alert('⚠️ Completa todos los campos correctamente.');
    }
  }
}


