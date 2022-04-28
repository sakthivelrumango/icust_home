import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/config/app.constant';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShowMessageService } from './showMessage/show-message.service';

export const API_URL = AppConstants.baseURL;

@Injectable({
  providedIn: 'root'
})
export class FundingStageService {

  addEditOrViewsummary: BehaviorSubject<any> = new BehaviorSubject<any>('');
  addEditOrViewsummaryData(action: any) {
    this.addEditOrViewsummary.next(action);
  }

  isSubmitted: BehaviorSubject<any> = new BehaviorSubject<any>('');
  isSubmittedResp(resp:boolean){
    this.isSubmitted.next(resp);
  }

  fundsEdit: BehaviorSubject<any> = new BehaviorSubject<any>('');
  fundsEditResp(data){
    this.fundsEdit.next(data);
  }

  constructor(private http: HttpClient,private showMessageService : ShowMessageService) { }
  private errorHandler = (errorResp : HttpErrorResponse) => {
    console.error('Error : ' + errorResp.message);
    console.error('status : ' + errorResp.status);
    this.showMessageService.errorMessage(errorResp.status,errorResp);
    return throwError(errorResp);
  }
  saveOrUpdateFundStageDetails(fundStageFormData) {
    console.log("in service")
    return this.http.post<any>(`${API_URL}/fundingStage/saveOrUpdateFunds`, fundStageFormData).pipe(catchError(this.errorHandler));;
  }

  getFundById(fundId) {
    return this.http.get(`${API_URL}/fundingStage/getFundById/${fundId}`).pipe(catchError(this.errorHandler));;
  }

  getFundByTellerTrxnRefNo(tellrTrxnRefNo) {
    return this.http.get(`${API_URL}/fundingStage/getFundByTellerTxRefNo/${tellrTrxnRefNo}`).pipe(catchError(this.errorHandler));;
  }

  getFundByAccountId(accountId) {
    return this.http.get(`${API_URL}/fundingStage/getFundByAccId/${accountId}`).pipe(catchError(this.errorHandler));;
  }

}
