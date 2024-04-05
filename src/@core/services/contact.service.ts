import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { ContactModel } from '../models/contact.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private firestore: Firestore
  ) { }

  create(contact: ContactModel) {
    const uid = localStorage.getItem('uid')

    const asssetsRef = collection(this.firestore, 'contact')
    return addDoc(asssetsRef, { ...contact, uid: uid } as ContactModel)
  }

  list() {
    const uid = localStorage.getItem('uid')
    const contactsRef = collection(this.firestore, 'contact')
    const contactsByUser = query(contactsRef, where("uid", "==", uid));
    return collectionData(contactsByUser, { idField: 'id' }) as Observable<ContactModel[]>
  }

  async find(id: string) {
    const assetsCategoryRef = collection(this.firestore, 'contact');
    return getDoc(doc(assetsCategoryRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  update(contact: ContactModel) {
    const uid = localStorage.getItem('uid')

    const contactDocRef = doc(this.firestore, `contact/${contact.id}`)
    return updateDoc(contactDocRef, { ...contact, uid: uid } as {})
  }

  delete(contactId: string) {
    const contactDocRef = doc(this.firestore, `contact/${contactId}`)
    return deleteDoc(contactDocRef);
  }

}
