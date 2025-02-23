import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
  standalone: true,
  imports: [CommonModule], // ✅ Necesario para *ngFor y *ngIf
})
export class InvoicesListComponent implements OnInit {
  invoices: any[] = [];
  filteredInvoices: any[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.showAllInvoices();
  }

  showAllInvoices() {
    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      this.filteredInvoices = invoices;
    });
  }

  showIssuedInvoices() {
    this.invoiceService.getIssuedInvoices().subscribe((invoices) => {
      this.filteredInvoices = invoices;
    });
  }

  showReceivedInvoices() {
    this.invoiceService.getReceivedInvoices().subscribe((invoices) => {
      this.filteredInvoices = invoices;
    });
  }

  editInvoice(id: string) {
    console.log('Editar factura con ID:', id);
  }

  deleteInvoice(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
      this.invoiceService.deleteInvoice('facturas', id).then(() => {
        this.filteredInvoices = this.filteredInvoices.filter(invoice => invoice.id !== id);
      });
    }
  }
}
