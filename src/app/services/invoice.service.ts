import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private firestore: Firestore) {}

  getAllInvoices(): Observable<any[]> {
    const issuedInvoicesRef = collection(this.firestore, 'facturas_emitidas');
    const receivedInvoicesRef = collection(this.firestore, 'facturas_recibidas');
    const issuedInvoices$ = collectionData(issuedInvoicesRef, { idField: 'id' });
    const receivedInvoices$ = collectionData(receivedInvoicesRef, { idField: 'id' });
    return combineLatest([issuedInvoices$, receivedInvoices$]).pipe(
      map(([issued, received]) => [...issued, ...received])
    );
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
function combineLatestLocal(arg0: Observable<(import("@firebase/firestore").DocumentData | (import("@firebase/firestore").DocumentData & { id: string; }))[]>[]) {
  throw new Error('Function not implemented.');
}

