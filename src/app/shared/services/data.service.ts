import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private paramSource = new BehaviorSubject({});
  getNavParam = this.paramSource.asObservable();

  private searchItem = new BehaviorSubject({});
  getSearchItem = this.searchItem.asObservable();

  private sendCustomerId = new BehaviorSubject("");
  getCustomerId = this.sendCustomerId.asObservable();

  private sendCifNumber = new BehaviorSubject("");
  getCifNumber = this.sendCifNumber.asObservable();

  constructor(private http: HttpClient) { }

  sendNavParam(params: object) {
    this.paramSource.next(params)
  }

  shareSearchItem(params: object) {
    this.searchItem.next(params)
  }

  shareCustomerId(customerId) {
    this.sendCustomerId.next(customerId);
  }

  shareCifNumber(cifNumber) {
    this.sendCifNumber.next(cifNumber);
  }

  getLogList() {
    return this.http.get('/api/apiLog/');
  }

  getLogById(id) {
    return this.http.get('/api/apiLog/'+id);
  }
  
  saveLog(data) {
    return this.http.post('/api/apiLog/', data);
  }


}