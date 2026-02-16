import {
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryNonFilterConstraint,
} from "firebase/firestore";

export interface FirebaseRepository {
  createNewDocument(body: any): Promise<void>;
  getDocument(...queryConstraints: QueryConstraint[]): Promise<any>;
  getDocument(
    compositeFilters: QueryCompositeFilterConstraint,
    ...queryNonFilterConstraint: QueryNonFilterConstraint[]
  ): Promise<any>;
  updateDocument(body: any): Promise<void>;
  deleteDocument(body: any): Promise<void>;
}
