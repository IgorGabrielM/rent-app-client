import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { AssetModel } from '../models/asset.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private firestore: Firestore
  ) { }

  create(asset: AssetModel) {
    const uid = localStorage.getItem('uid')

    const asssetsRef = collection(this.firestore, 'asset')
    return addDoc(asssetsRef, { ...asset, is_available: true, assetCategory: asset.assetCategory, uid: uid } as AssetModel)
  }

  list() {
    const uid = localStorage.getItem('uid')
    const assetsRef = collection(this.firestore, 'asset')
    const assetsByUser = query(assetsRef, where("uid", "==", uid))
    return collectionData(assetsByUser, { idField: 'id' }) as Observable<AssetModel[]>
  }

  async find(id: string) {
    const assetsRef = collection(this.firestore, 'asset');
    return getDoc(doc(assetsRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  listByAssetCategory(idAssetCategory: string) {
    const uid = localStorage.getItem('uid')
    const assetsRef = collection(this.firestore, 'asset');
    const q = query(assetsRef, where('assetCategory.id', '==', idAssetCategory), where("uid", "==", uid));
    return collectionData(q, { idField: 'id' });
  }

  update(asset: AssetModel) {
    const assetDocRef = doc(this.firestore, `asset/${asset.id}`)
    return updateDoc(assetDocRef, asset as {});
  }

  delete(assetId: string) {
    const assetDocRef = doc(this.firestore, `asset/${assetId}`)
    return deleteDoc(assetDocRef);
  }

}
