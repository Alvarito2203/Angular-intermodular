import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; //  Importar CommonModule
import { InvoiceService } from '../../../services/invoice.service';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Necesario para *ngFor y *ngIf
})
export class InvoicesListComponent implements OnInit {
  invoices: any[] = [];
  filteredInvoices: any[] = [];
  constructor(private invoiceService: InvoiceService, @Inject(Router) private router: Router, @Inject(AuthService) private authService: AuthService ) {}  // ✅ Inyecta Router en el constructor
  

  ngOnInit(): void {
    this.showAllInvoices(); //para que abra con todas las facturas
  } 

  showAllInvoices() {
    this.invoiceService.getAllInvoices().subscribe((invoices) => { //suscribe para que se actualice
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
  getInvoices() {
    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      this.filteredInvoices = invoices;
    });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert('Sesión cerrada correctamente.');
      this.router.navigate(['/auth/login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión.');
    });
  }
  

  
  deleteInvoice(invoiceId: string, invoiceType: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta factura?')) {
      this.invoiceService.deleteInvoice(invoiceId, invoiceType)
        .then(() => {
          // Actualiza visualmente la lista de facturas
          this.invoices = this.invoices.filter(invoice => invoice.id !== invoiceId);
          console.log('Factura eliminada correctamente.');
        })
        .catch(error => console.error('Error al eliminar la factura:', error));
    }
  }
  refreshInvoices(): void {
    this.loadInvoices();  // Vuelve a cargar las facturas desde Firebase
    this.showSuccessMessage();  // Muestra el mensaje de éxito
  }
  showSuccessMessage(): void {
    alert('Facturas actualizadas correctamente.');
  }
  
  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }
  
  
  goToAddInvoice() {
    this.router.navigate(['/invoices/add']);  // ✅ Navegación correcta
  }
  goToEditInvoice(invoice: any) {
    this.router.navigate(['/invoices/edit', invoice.id]);  // Usa el id generado por Firebase
  }
  goToDetail(invoice: any) {
    if (!invoice || !invoice.id || !invoice.tipo) {
      console.error("❌ Error: El tipo de factura no está definido");
      return;
    }
  
    console.log(`Factura seleccionada: ${invoice.id} Tipo: ${invoice.tipo}`);
  
    this.router.navigate([`/invoices/detail/${invoice.id}`], { queryParams: { tipo: invoice.tipo } });
  }
  
  
  
  
  
  
}
