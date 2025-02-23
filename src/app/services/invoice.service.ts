import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private firestore: Firestore) {}

  getAllInvoices(): Observable<any[]> {
    const invoicesRef = collection(this.firestore, 'facturas');
    return collectionData(invoicesRef, { idField: 'id' });
  }

  getIssuedInvoices(): Observable<any[]> {
    const invoicesRef = collection(this.firestore, 'facturas_emitidas');
    return collectionData(invoicesRef, { idField: 'id' });
  }

  getReceivedInvoices(): Observable<any[]> {
    const invoicesRef = collection(this.firestore, 'facturas_recibidas');
    return collectionData(invoicesRef, { idField: 'id' });
  }

  // ✅ Método para agregar una nueva factura
  addInvoice(collectionName: string, invoice: any) {
    const invoicesRef = collection(this.firestore, collectionName);
    return addDoc(invoicesRef, invoice);
  }

  deleteInvoice(collectionName: string, id: string) {
    const invoiceDoc = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(invoiceDoc);
  }
}
