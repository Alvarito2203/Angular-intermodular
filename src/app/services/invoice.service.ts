//serviciso par las facturas desde la firebase

import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { getDoc, updateDoc } from '@firebase/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private firestore: Firestore) {}


  //funcion para coger todas las facturassean recibidas o emitidas, osea las dos columnas de la firebase
  getAllInvoices(): Observable<any[]> {
    const issuedInvoicesRef = collection(this.firestore, 'facturas_emitidas'); 
    const receivedInvoicesRef = collection(this.firestore, 'facturas_recibidas'); 
    const issuedInvoices$ = collectionData(issuedInvoicesRef, { idField: 'id' }); //obtiene por id, issued es emitida
    const receivedInvoices$ = collectionData(receivedInvoicesRef, { idField: 'id' }); //obtiene por id received es recibida
    return combineLatest([issuedInvoices$, receivedInvoices$]).pipe(
      map(([issued, received]) => [...issued, ...received])   //con el map se mezcvclna las colecciones
    );
  }
  
  // Actualiza una factura en la base de datos según su tipo 
  updateInvoice(id: string, updatedData: any): Promise<void> {
    const collectionName = updatedData.tipo === 'emitida' ? 'facturas_emitidas' : 'facturas_recibidas'; 
    const invoiceRef = doc(this.firestore, `${collectionName}/${id}`); // Crea una referenci  al documento correcto en Firebase
    return updateDoc(invoiceRef, updatedData); // Actualiza de nuevo
  }
  
  // Coge las emitidas de la firebase
  getIssuedInvoices(): Observable<any[]> {
    const invoicesRef = collection(this.firestore, 'facturas_emitidas'); 
    return collectionData(invoicesRef, { idField: 'id' }); // Devuelve los datos de las facturas emitidas con sus IDs
  }

  // OCoge las recibidas de la firebase
  getReceivedInvoices(): Observable<any[]> {
    const invoicesRef = collection(this.firestore, 'facturas_recibidas'); 
    return collectionData(invoicesRef, { idField: 'id' }); // Devuelve los datos de las facturas recibidas con sus IDs
  }

  // Método para agregar una nueva factura 
  addInvoice(collectionName: string, invoice: any) {
    const invoicesRef = collection(this.firestore, collectionName); // Obtiene la referencia de la colección donde se guardará la factura
    return addDoc(invoicesRef, invoice); // Añade la nueva factura a Firebase
  }

  // Elimina una factura según su ID y tipo
  deleteInvoice(invoiceId: string, invoiceType: string): Promise<void> {
    const collectionName = invoiceType === 'emitida' ? 'facturas_emitidas' : 'facturas_recibidas'; 
    const invoiceDocRef = doc(this.firestore, `${collectionName}/${invoiceId}`); // Referencia al documento correcto en Firebase
    return deleteDoc(invoiceDocRef); // Elimina la factura de Firebase
  }
  
  // Obtiene una factura específica por su ID y tipo, metodo para hacer lo de pinchar y ver los datos
  getInvoiceById(tipo: string, id: string): Observable<any> {
    if (!tipo || !id) {
      console.error("⚠️ Error: Tipo o ID no proporcionados."); // error por si no va
      return new Observable(); // Observable vacío para evitar errores
    }

    const collectionName = tipo === 'emitida' ? 'facturas_emitidas' : 'facturas_recibidas'; 
    const invoiceDocRef = doc(this.firestore, `${collectionName}/${id}`); // Referencia al documento en Firebase

    console.log(`📌 Buscando factura en Firestore: ${collectionName}/${id}`); // Mensaje de que esta cargando bien
    
    return docData(invoiceDocRef); // imprime nuestros datos de la factura que hemos pinchao
  }
}


