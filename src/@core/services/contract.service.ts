import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, getDoc, query, where } from '@angular/fire/firestore';
import { ContractModel } from '../models/contract.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private firestore: Firestore
  ) { }

  create(contract: ContractModel) {
    const uid = localStorage.getItem('uid')

    const contractsRef = collection(this.firestore, 'contract')
    return addDoc(contractsRef, { ...contract, uid: uid, createdAt: new Date() } as ContractModel)
  }

  list() {
    const uid = localStorage.getItem('uid')
    const contractsRef = collection(this.firestore, 'contract')
    const contractByUser = query(contractsRef, where("uid", "==", uid));
    return collectionData(contractByUser, { idField: 'id' }) as Observable<ContractModel[]>
  }

  getTermsServices() {
    const contractsRef = collection(this.firestore, 'contract_terms')
    return collectionData(contractsRef, { idField: 'id' })
  }

  async find(id: string) {
    const contractsCategoryRef = collection(this.firestore, 'contract');
    return getDoc(doc(contractsCategoryRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  update(contract: ContractModel) {
    const uid = localStorage.getItem('uid')

    const contractDocRef = doc(this.firestore, `contract/${contract.id}`)
    return updateDoc(contractDocRef, { ...contract, uid: uid } as {});
  }

  delete(contractId: string) {
    const contractDocRef = doc(this.firestore, `contract/${contractId}`)
    return deleteDoc(contractDocRef);
  }

}
