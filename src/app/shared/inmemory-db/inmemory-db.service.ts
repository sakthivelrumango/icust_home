import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LogDB } from './log';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { 
      'apiLog': LogDB.logCollection,
    }
  }
}