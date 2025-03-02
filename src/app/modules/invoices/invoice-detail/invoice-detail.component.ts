import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  standalone: true,
      imports: [CommonModule, ReactiveFormsModule],
})
export class InvoiceDetailComponent implements OnInit {
  invoiceData: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      this.route.queryParamMap.subscribe(queryParams => {
        const tipo = queryParams.get('tipo');

        if (!id || !tipo) {
          console.error("❌ Error: ID o Tipo no proporcionados.");
          this.loading = false;
          return;
        }

        console.log(`Factura seleccionada - ID: ${id} Tipo: ${tipo}`);

        this.invoiceService.getInvoiceById(tipo, id).subscribe(invoice => {
          if (invoice) {
            console.log("✅ Factura encontrada:", invoice);
            this.invoiceData = invoice;
          } else {
            console.error("❌ No se encontró la factura.");
          }
          this.loading = false;
        });
      });
    });
  }
  goBack() {
    this.router.navigate(['/invoices']); // 🔙 Redirige a la lista de facturas
  }
  
}
