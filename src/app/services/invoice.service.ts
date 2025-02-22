import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private firestore: Firestore) {}

  addInvoice(invoice: any) {
    const invoiceRef = collection(this.firestore, 'facturas');
    return addDoc(invoiceRef, invoice);
  }

  getInvoices() {
    const invoiceRef = collection(this.firestore, 'facturas');
    return getDocs(invoiceRef);
  }

  updateInvoice(id: string, data: any) {
    const invoiceDoc = doc(this.firestore, `facturas/${id}`);
    return updateDoc(invoiceDoc, data);
  }

  deleteInvoice(id: string) {
    const invoiceDoc = doc(this.firestore, `facturas/${id}`);
    return deleteDoc(invoiceDoc);
  }
}
