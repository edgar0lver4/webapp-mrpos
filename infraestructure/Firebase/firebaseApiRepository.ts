import { FIREBASE_CONFIG } from "@core/Firebase/configuration";
import { FirebaseRepository } from "@core/Firebase/domain";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  getFirestore,
  query,
  updateDoc,
} from "firebase/firestore";

export class FirebaseApiRepository implements FirebaseRepository {
  protected app: FirebaseApp;
  protected db: Firestore;
  protected collectionRef: CollectionReference;
  constructor(root: string, segments: string[]) {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.db = getFirestore(this.app);
    this.collectionRef = collection(this.db, root, ...segments);
  }
  async createNewDocument(body: any): Promise<void> {
    try {
      await addDoc(this.collectionRef, body);
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al guardar en información en la base de datos");
    }
  }
  async getDocument<T>(where?: any): Promise<DocumentData | Array<T>> {
    try {
      const elements: any[] = [];
      const queryDoc = where
        ? query(this.collectionRef, where)
        : query(this.collectionRef);
      const docSnap = await getDocs(queryDoc);
      if (docSnap.size > 0) {
        docSnap.forEach((doc) => elements.push(doc.data()));
        return elements;
      } else {
        return [];
      }
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al obtener en información en la base de datos");
    }
  }
  async deleteDocument(body: any): Promise<void> {
    const newBody = { ...body, isDeleted: true };
    try {
      await updateDoc(doc(this.collectionRef), newBody);
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al borrar en información en la base de datos");
    }
  }
  async updateDocument(body: any): Promise<void> {
    try {
      await updateDoc(doc(this.collectionRef), body);
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al actualizar en información en la base de datos");
    }
  }
}
