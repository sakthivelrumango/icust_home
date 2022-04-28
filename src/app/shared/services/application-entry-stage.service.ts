import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/config/app.constant';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShowMessageService } from './showMessage/show-message.service';

export const API_URL = AppConstants.baseURL;

@Injectable({
  providedIn: 'root'
})
export class ApplicationEntryStageService {

  constructor(private http: HttpClient, private showMessageService: ShowMessageService) { }
  private errorHandler = (errorResp: HttpErrorResponse) => {
    console.error('Error : ' + errorResp.message);
    console.error('status : ' + errorResp.status);
    this.showMessageService.errorMessage(errorResp.status, errorResp);
    return throwError(errorResp);
  }
  saveProductAccountInfo(accountInfo: any) {
    return this.http.post<any>(`${API_URL}/productAccount`, accountInfo).pipe(catchError(this.errorHandler));
  }

  saveCustomerDetails1(customerInfo: any) {
    return this.http.post<any>(`${API_URL}/productCustomer/save`, customerInfo).pipe(catchError(this.errorHandler));
  }

  saveCustomerDetails2(customerInfo: any) {
    return this.http.post<any>(`${API_URL}/productApplicant`, customerInfo).pipe(catchError(this.errorHandler));
  }


  saveMandateDetails(mandateInfo: any) {
    return this.http.post<any>(`${API_URL}/productMandate`, mandateInfo).pipe(catchError(this.errorHandler));
  }

  getByAccountId(accountId: any) {
    return this.http.get(`${API_URL}/productAccount/account/${accountId}`).pipe(catchError(this.errorHandler));
  }

  updateAccountStatusService(data: any) {
    return this.http.put(`${API_URL}/productAccount/updateStatus`, data).pipe(catchError(this.errorHandler));
  }

  deleteMandateById(id, loggedInUser) {
    return this.http.delete(`${API_URL}/productMandate/${id}/${loggedInUser}`).pipe(catchError(this.errorHandler));
  }

  fetchAccountDependentInfo(accountId:any){
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomerDependentInfo?accountId=${accountId}`).pipe(
      catchError(this.errorHandler));
  }

  createAndUpdateAccountants(accountModel:any){
    return this.http.post<any>(`${API_URL}/customerdata/upsertCustomerDependentInfo`, accountModel).pipe(catchError(this.errorHandler));
  }

  fetchByCif(cifNumber:any){
    return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo?cifNumber=${cifNumber}`).pipe(catchError(this.errorHandler));
  }

  deleteApplicant(customerId:any, dependentId:any){
    return this.http.delete(`${API_URL}/customerdata/deleteDependent?customerId=${customerId}&dependentId=${dependentId}`).pipe(catchError(this.errorHandler));
  }
  
}
