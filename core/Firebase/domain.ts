export interface FirebaseRepository {
  createNewDocument(body: any): Promise<void>;
  getDocument(query?: any): Promise<any>;
  updateDocument(body: any): Promise<void>;
  deleteDocument(body: any): Promise<void>;
}
