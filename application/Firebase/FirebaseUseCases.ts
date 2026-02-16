import { FirebaseApiRepository } from "@infraestructure/Firebase/firebaseApiRepository";
import {
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryNonFilterConstraint,
} from "firebase/firestore";

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
  async get<T>(...queryConstraints: QueryConstraint[]): Promise<Array<T>>;
  async get<T>(
    compositeFilters: QueryCompositeFilterConstraint,
    ...queryNonFilterConstraint: QueryNonFilterConstraint[]
  ): Promise<Array<T>>;
  async get<T>(
    first?: QueryConstraint | QueryCompositeFilterConstraint,
    ...rest: any[]
  ): Promise<Array<T>> {
    return this.apiRepository.getDocument(first as any, ...rest);
  }
}
