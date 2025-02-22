import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private firestore: Firestore) {}

  addProject(project: any) {
    const projectRef = collection(this.firestore, 'proyectos');
    return addDoc(projectRef, project);
  }

  getProjects() {
    const projectRef = collection(this.firestore, 'proyectos');
    return getDocs(projectRef);
  }
}
