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
    imports: [CommonModule, ReactiveFormsModule],
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadInvoice();
    this.invoiceForm.valueChanges.subscribe(() => this.recalculateTotal());
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      fecha: ['', Validators.required],
      emisor: ['', [Validators.required, Validators.minLength(2)]],
      receptor: ['', [Validators.required, Validators.minLength(2)]],
      baseImponible: [0, [Validators.required, Validators.min(0)]],
      iva: [21, Validators.required],
      tipo: ['emitida', Validators.required],
      total: [{ value: 0, disabled: true }] // Mostrar total en tiempo real
    });
  }

  loadInvoice(): void {
    this.invoiceService.getAllInvoices().subscribe((invoices: any[]) => {
      const invoice = invoices.find(inv => inv.id === this.invoiceId);
      if (invoice) {
        this.invoiceForm.patchValue(invoice);
        this.recalculateTotal();  // Calcular total al cargar datos
      } else {
        alert('Factura no encontrada.');
        this.router.navigate(['/invoices']);
      }
    });
  }

  recalculateTotal(): void {
    const { baseImponible, iva, tipo } = this.invoiceForm.value;
    const ivaDecimal = Number(iva) / 100;
    let total = 0;

    if (tipo === 'emitida') {
      total = baseImponible + baseImponible * ivaDecimal; // Para emitidas
    } else if (tipo === 'recibida') {
      total = baseImponible - baseImponible * ivaDecimal; // Para recibidas
    }

    this.invoiceForm.patchValue({ total: parseFloat(total.toFixed(2)) }, { emitEvent: false }); //parseFloat sirve para convertir un string a un número y el 2 para redondear a 2 decimales
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const updatedData = { ...this.invoiceForm.getRawValue() };
      this.invoiceService.updateInvoice(this.invoiceId, updatedData).then(() => {
        alert('✅ Factura actualizada correctamente.');
        this.router.navigate(['/invoices']);
      }).catch((error) => {
        console.error('❌ Error al actualizar factura:', error);
      });
    } else {
      alert('⚠️ Completa todos los campos correctamente.');
    }
  }
}

