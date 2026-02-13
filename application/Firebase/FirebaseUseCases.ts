import { FirebaseApiRepository } from "@infraestructure/Firebase/firebaseApiRepository";

export class FirebaseUseCases {
  protected apiRepository: FirebaseApiRepository;
  constructor(dbName: string) {
    const root = dbName.split("/")[0];
    const segments = dbName.replace(root + "/", "").split("/");
    this.apiRepository = new FirebaseApiRepository(root, segments);
  }

  async insert(body: any): Promise<void> {
    return this.apiRepository.createNewDocument(body);
  }

  async update(body: any) {
    return this.apiRepository.updateDocument(body);
  }

  async get<T>(where?: any) {
    return this.apiRepository.getDocument(where) as T;
  }
}
