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
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryNonFilterConstraint,
  updateDoc,
} from "firebase/firestore";
import dayjs from "@libs/dayjs";

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
    const nowMexico = dayjs().tz("America/Mexico_City").toDate().toISOString();
    try {
      const payload = {
        ...body,
        createAt: nowMexico,
        updateAt: nowMexico,
      };
      await addDoc(this.collectionRef, payload);
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al guardar en información en la base de datos");
    }
  }
  async getDocument<T>(
    ...queryConstraints: QueryConstraint[]
  ): Promise<Array<T>>;
  async getDocument<T>(
    compositeFilters: QueryCompositeFilterConstraint,
    ...queryNonFilterConstraint: QueryNonFilterConstraint[]
  ): Promise<Array<T>>;
  async getDocument<T>(
    first?: QueryConstraint | QueryCompositeFilterConstraint,
    ...rest: any[]
  ): Promise<Array<T>> {
    try {
      const elements: T[] = [];
      let queryDoc;
      if (first) {
        queryDoc = query(this.collectionRef, first as any, ...rest);
      } else {
        queryDoc = query(this.collectionRef);
      }
      const docSnap = await getDocs(queryDoc);
      docSnap.forEach((doc) => elements.push(doc.data() as T));
      return elements;
    } catch (e) {
      console.error("Error al obtener documento fire20005");
      return [];
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
    const nowMexico = dayjs().tz("America/Mexico_City").toDate().toISOString();
    try {
      const payload = {
        ...body,
        updateAt: nowMexico,
      };
      await updateDoc(doc(this.collectionRef), payload);
    } catch (e) {
      console.log("Error:", e);
      throw Error("Error al actualizar en información en la base de datos");
    }
  }
}
