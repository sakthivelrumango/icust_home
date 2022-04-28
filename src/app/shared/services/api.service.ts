import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/config/app.constant';
import { BehaviorSubject, throwError, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ShowMessageService } from './showMessage/show-message.service';
// import { AppConstants } from './config/app.constant';
// import { OtpModel } from './views/others/kyc-screening/kyc-screening.component';
export const API_URL = AppConstants.baseURL;
export const API_URL1 = 'http://localhost:1212';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private showMessageService: ShowMessageService) { }
  private errorHandler = (errorResp: HttpErrorResponse) => {
    console.error('Error : ' + errorResp.message);
    console.error('status : ' + errorResp.status);
    this.showMessageService.errorMessage(errorResp.status, errorResp);
    return throwError(errorResp);
  }
  private newUser = new BehaviorSubject<any>({
    prefix: '',
    firstName: '',
    lastName: '',
    primaryEmailAdress: '',
    phoneNumber: ''
  });
  private name = new BehaviorSubject<any>({
    name: ''
  })
  private KycRef = new BehaviorSubject<any>({
    kycReference: ''
  })
  private verify = new BehaviorSubject<any>({
    verify: '',
    type: ''
  })
  private verify1 = new BehaviorSubject<any>({
    verify: '',
    type: ''
  })
  private OCR = new BehaviorSubject<any>({
    namePancard:'',
    dob :'',
    panNumber:'' ,
    imageOCR:'',
    imageOCRBack:'',
    address:''

  })
  private Index = new BehaviorSubject<any>({
    index: '',
  })
  private Id = new BehaviorSubject<any>({
    id: '',
  })
  private AccountId = new BehaviorSubject<any>({
    accountId: '',
  })
  private AccountType = new BehaviorSubject<any>({
    accountId: '',
  })
  private Flag = new BehaviorSubject<any>({
    flag: ''
  })
  private chargeFlag = new BehaviorSubject<any>({
    chargeflag: ''
  })
  private finishFlag = new BehaviorSubject<any>({
    finishFlag: true
  })
  getchargeFlag() {
    return this.chargeFlag.asObservable();
  }
  setchargeFlag(charge) {
    this.chargeFlag.next(charge);
  }
  getOCR() {
    return this.OCR.asObservable();
  }
  setOCR(ocr) {
    this.OCR.next(ocr);
  }
  getFinishFlag() {
    return this.finishFlag.asObservable();
  }
  setName(name) {
    this.name.next(name);
  }
  getName() {
    return this.name.asObservable();
  }
  setFinishFlag(finishFlag) {
    this.finishFlag.next(finishFlag);
  }
  getAccountType() {
    return this.AccountType.asObservable();
  }
  setAccountType(accountType: any) {
    this.AccountType.next(accountType);
  }
  getFlag() {
    return this.Flag.asObservable();
  }
  setFlag(flag: any) {
    this.Flag.next(flag);
  }
  getId() {
    return this.Id.asObservable();
  }
  setKycRef(kycRef: any) {
    this.KycRef.next(kycRef);
  }
  getKycRef() {
    return this.KycRef.asObservable();
  }
  setId(id: any) {
    this.Id.next(id);
  }
  getAccountId() {
    return this.AccountId.asObservable();
  }
  setAccountId(accId: any) {
    this.AccountId.next(accId);
  }
  setNewUserInfo(user: any) {
    this.newUser.next(user);
  }

  getNewUserInfo() {
    return this.newUser.asObservable();
  }
  setIndex(index: any) {
    this.Index.next(index);
  }

  getIndex() {
    return this.Index.asObservable();
  }
  setVerify(verify: any) {
    this.verify.next(verify);
  }

  getverify() {
    return this.verify.asObservable();
  }
  // email
  setVerify1(verify: any) {
    this.verify1.next(verify);
  }
  getverify1() {
    return this.verify1.asObservable();
  }
  getAccountDetailsById(accountId: any) {
    return this.http.get<any>(`${API_URL}/productAccount/account/${accountId}`).pipe(catchError(this.errorHandler));
  }

  getScorecardQuestions(accountType: any) {
    return this.http.get<any>(`${API_URL}/qualitative-scorecard/getQuestionDetails?accountType=${accountType}`).pipe(catchError(this.errorHandler));
  }

  getCustomerInformationDetailsById(accountId: any) {
    return this.http.get<any>(`${API_URL}/productCustomer/${accountId}`).pipe(catchError(this.errorHandler));
  }

  getOtp(otp: Object) {
    return this.http.post<any>(`${API_URL}/rest/otp/generateOtp`, otp).pipe(catchError(this.errorHandler));
  }
  getOtpValidating(obj: object) {
    return this.http.put<any>(`${API_URL}/rest/otp/validateOtp`, obj);
  }

  getCustomerDashBoardDetails(): Observable<Text | ArrayBuffer> {
    return this.http.get<any>(`${API_URL}/customerdata`, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));
    //  .pipe(catchError(this.errorHandler));
  }
  getProfileDetails(customerId: any) {
    return this.http.get<any>(`${API_URL}/customerdata/getProfileDetails?customerId=${customerId}`).pipe(catchError(this.errorHandler));
  }

  fetchSignatureInfo(customerId: any) {
  return this.http.get<any>(`${API_URL}/accountdata/fetchSignatureInfo?customerId=${customerId}`).pipe(catchError(this.errorHandler));
  }

  getAccountDetail(casaLink) {
    return this.http.get<any>(`${API_URL}/${casaLink}`).pipe(catchError(this.errorHandler));
  }
  getAlertSlots(alerts: object) {
    return this.http.post<any>(`${API_URL}/customerdata`, alerts);
    //  .pipe(catchError(this.errorHandler));
  }
  getAccountInfoDetails(accountInfo: object) {
    return this.http.post<any>(`${API_URL}/customerdata`, accountInfo);
    //  .pipe(catchError(this.errorHandler));
  }

  getCasaAccDetails(customerId: any) {
    return this.http.get<any>(`${API_URL}/customerdata/getProfileDetails?customerId=${customerId}`).pipe(catchError(this.errorHandler));
  }
  getKycStatus(customerId: any) {
    return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo?customerId=${customerId}`).pipe(catchError(this.errorHandler));
  }
  getCasaDetails(casaLink: any) {
    return this.http.get<any>(`${API_URL}${casaLink}`).pipe(catchError(this.errorHandler));
  }
  getCasaDetailsScreen(accountId: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getAccountInfo?accountId=${accountId}`).pipe(catchError(this.errorHandler));
  }

  getDependentsData(customerId: any) {
    return this.http.get<any>(`${API_URL}/customerdata/dashboard/fetchDependent?customerId=${customerId}`);
  }

  getDropDownValues(entityName: string) {
    return this.http.get<string[]>(`${API_URL}/rest/data/getMasterData?entityName=${entityName}`).pipe(catchError(this.errorHandler))
  }

  getDropDownValues1(entityName: string, key: string) {
    
    return this.http.get<string[]>(`${API_URL}/rest/data/getMasterDataInfo?entityName=${entityName}&key=${key}`).pipe(catchError(this.errorHandler))
  }

  getDropDownForStateCity(entityName: string, key: string) {
    return this.http.get<string[]>(`${API_URL}/rest/data/getMasterDataInfo1?entityName=${entityName}&key=${key}`).pipe(catchError(this.errorHandler))
  }


  // getCustInfo(custId: string) {
  //   return this.http.get<any>(`${API_URL}/customerdata/${custId}`).pipe(catchError(this.errorHandler));
  // }
  getCustInfo(cifNumber: any) {
    return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo?cifNumber=${cifNumber}`).pipe(catchError(this.errorHandler));
  }

  kycScreenBasicinfo(data: object) {
    return this.http.post<any>(`${API_URL}/customerdata/upsertCustomerDetails`, data).pipe(catchError(this.errorHandler));
  }

  securedDraft(data: any) {
    return this.http.post<any>(`${API_URL}/accountdata/upsertSecuredoverDraft`, data).pipe(catchError(this.errorHandler));
  }
  fetchBySecurityNumber(securityReferenceNum:any){
    return this.http.get<any>(`${API_URL}/accountdata/getSecuredOverdraftDetails?securityReferenceNumber=${securityReferenceNum}`).pipe(catchError(this.errorHandler));
  }
  deleteCollateral(collateralId: any) {
    return this.http.delete(`${API_URL}/accountdata/deleteSecuredOverdraft/collateral?id=${collateralId}`).pipe(catchError(this.errorHandler));
  }
  uploadcollateralDoc(uploadData) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadCollateralDocument`, uploadData).pipe(catchError(this.errorHandler));
  }
  // responseType : 'text' as 'json',
  // reportProgress: true,
  // observe: 'events',
  
  
  unsecuredDraft(data: object) {
    return this.http.post<any>(`${API_URL}/accountdata/upsertUnSecuredoverDraft`, data).pipe(catchError(this.errorHandler));
  }

  DocumentUplaod(file: Object, content: string) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadDoc/${content}`, file).pipe(catchError(this.errorHandler));
  }

  insertNewUserOnboarding(data: any) {
    return this.http.post<any>(`${API_URL}/customerdata/upsertCustomerDetails`, data).pipe(catchError(this.errorHandler));
  }

  uploadDocument(uploadData: any) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadDoc`, uploadData).pipe(catchError(this.errorHandler));
  }
  // uploadSignature(uploadData: any) {
  //   return this.http.post<any>(`${API_URL}/rest/upload/uploadSignature`, uploadData).pipe(catchError(this.errorHandler));
  // }
  uploadSignature(uploadData) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadSignature`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.errorHandler))
  }
  chargeDetailsSave(data: object) {
    return this.http.post<any>(`${API_URL}/accountdata/saveChargeDetails`, data).pipe(catchError(this.errorHandler));

  }
  intrestDetailsSave(data: object) {
    return this.http.post<any>(`${API_URL}/accountdata/saveIntrestDetails`, data).pipe(catchError(this.errorHandler));
  }
  approvalAccountFetch(accountId: string) {
    return this.http.get<any>(`${API_URL}/productAccount/account/${accountId}`).pipe(catchError(this.errorHandler));
  }
  approvalUpdate(data: object) {
    return this.http.post<any>(`${API_URL}/productAccount`, data).pipe(catchError(this.errorHandler));
  }
  upload(uploadData) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadDoc`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.errorHandler))
  }
  upload1(uploadData) {
    return this.http.post<any>(`${API_URL}/rest/upload/uploadDoc`, uploadData).pipe(catchError(this.errorHandler))
  }
  saveDependents(uploadData) {
    return this.http.post<any>(`${API_URL}/customerdata/upsertCustomerDependentInfo`, uploadData).pipe(catchError(this.errorHandler))
  }

  upsertfinancialDetails(financialDetails) {
    return this.http.post<any>(`${API_URL}/accountdata/upsertfinancialDetails`, financialDetails).pipe(catchError(this.errorHandler))
  }

  getFlexcubeDetails(eventType: String, accountType: String) {
    return this.http.get<any>(`${API_URL}/accountdata/getChargeIntrestDetails?eventType=${eventType}&accountType=${accountType}`).pipe(catchError(this.errorHandler))
  }

  getAssessmentReportDetails(accountId: any) {
    return this.http.get<any>(`${API_URL}/application-assessment/getAssessmentReport/${accountId}`).pipe(catchError(this.errorHandler));
  }
  getApplnAssessmentDetails(accountId: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getApplicationAssessmentSummary/${accountId}`).pipe(catchError(this.errorHandler));
  }


  saveAssessmentReports(data) {
    return this.http.post<any>(`${API_URL}/application-assessment`, data).pipe(catchError(this.errorHandler));
  }
  saveQualitativeScorecard(data) {
    return this.http.post<any>(`${API_URL}/qualitative-scorecard`, data).pipe(catchError(this.errorHandler));
  }

  createCustomerInformation(nominee: any) {
    return this.http.post<any>(`${API_URL}/accountdata/upsertfinancialDetails`, nominee).pipe(catchError(this.errorHandler));
  }

  getListofNominess() {
    return this.http.get<any>(`${API_URL}/customerAccNominee`).pipe(catchError(this.errorHandler));
  }

  createNominee(userId: any, nomineeModel: any) {
    return this.http.post<any>(`${API_URL}/customerAccNominee/${userId}`, nomineeModel).pipe(catchError(this.errorHandler));
  }

  updateNominee(userId: any, nomineeModel: any) {
    return this.http.post<any>(`${API_URL}/customerAccNominee/${userId}`, nomineeModel).pipe(catchError(this.errorHandler));
  }

  createAccountService(userId: any, serviceModel: any) {
    return this.http.post<any>(`${API_URL}/customerAccServices/${userId}`, serviceModel).pipe(catchError(this.errorHandler));
  }

  updateAccountService(userId: any, serviceModel: any) {
    // return this.http.put<any>(`${API_URL}/customerAccServices/${userId}`, serviceModel).pipe(catchError(this.errorHandler));
    return this.http.post<any>(`${API_URL}/customerAccServices/${userId}`, serviceModel).pipe(catchError(this.errorHandler));
  }
  // to send and recive data of approvalStaging
  private paramSource = new BehaviorSubject({});
  getNavParam = this.paramSource.asObservable();
  sendApprovalStgingData(params: any) {
    this.paramSource.next(params)
  }
  getIntrestValues(accountId: string) {
    return this.http.get<any>(`${API_URL}/accountdata/getIntrestDetails?accountId=${accountId}`).pipe(catchError(this.errorHandler))

  }
  getChargeValues(accountId: string) {
    return this.http.get<any>(`${API_URL}/accountdata/getChargeDetails?accountId=${accountId}`).pipe(catchError(this.errorHandler))
  }

  getQualitativeScorecardDetails(accountId: any) {
    return this.http.get<any>(`${API_URL}/qualitative-scorecard/getQualitativeScoreCard/${accountId}`).pipe(catchError(this.errorHandler));
  }

  gettingMandateDetails(accountId) {
    return this.http.get(`${API_URL}/productMandate/${accountId}`, accountId).pipe(catchError(this.errorHandler));
  }

  LimitEntrySummary(id: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getLimitEntrySummary?accountId=${id}`).pipe(catchError(this.errorHandler));
  }
  securedOverdraftSummary(id: any) {
    return this.http.get(`${API_URL}/accountdata/getSecuredOverdraftDetails?accountId=${id}`).pipe(catchError(this.errorHandler));
  }
  UnsecuredOverdraftSummary(id: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getUnsecuredOverdraftDetails?accountId=${id}`).pipe(catchError(this.errorHandler));
  }
  getFinancialDetails(id: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getFinancialDetails?accountId=${id}`).pipe(catchError(this.errorHandler));
  }

  getLimitEntrySummary(id: any) {
    return this.http.get<any>(`${API_URL}/accountdata/getLimitEntrySummary?accountId=${id}`).pipe(catchError(this.errorHandler));
  }

  gettingNomineeDetails(productAccountId) {
    return this.http.get(`${API_URL}/customerAccNominee/${productAccountId}`, productAccountId).pipe(catchError(this.errorHandler));
  }

  getAccountIdByCusId(customerId) {
    return this.http.get<any>(`${API_URL}/accountdata/fetchAccount/${customerId}`).pipe(catchError(this.errorHandler));
  }

  gettingAccountServiceDetails(productAccountId) {
    return this.http.get(`${API_URL}/customerAccServices/${productAccountId}`).pipe(catchError(this.errorHandler));
  }

  gettingAccountServiceetails(productAccountId) {
    return this.http.get(`${API_URL}/customerAccServices/${productAccountId}`, productAccountId).pipe(catchError(this.errorHandler));
  }

  gettingallDetails(productId: any) {
    return this.http.get<any>(`${API_URL}/accountEntryStage/${productId}`, productId).pipe(catchError(this.errorHandler))
  }


  gettingCustomerDetails(cifNumber: any) {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo?cifNumber=${cifNumber}`).pipe(catchError(this.errorHandler));
  }

  getImage(id: any) {
    return this.http.get(`${API_URL}/customerdata/getProfileDetails?customerId=${id}`).pipe(catchError(this.errorHandler))
  }
  getPrimaryInfo(kycNum: any) {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo?kycReference=KYC_${kycNum}`).pipe(catchError(this.errorHandler))
  }
  searchNames(name: any) {
    return this.http.get(`${API_URL}/customerdata/fetchCustomers/${name}`).pipe(catchError(this.errorHandler))
  }
  dashboardProfile(id: any) {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo?customerId=${id}`).pipe(catchError(this.errorHandler))
  }
  getCustOnboardingTaskSummaryList() {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo/`).pipe(catchError(this.errorHandler));;
  }
  getCustOnboardingTaskSummary(customerId) {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo?customerId=${customerId}`).pipe(catchError(this.errorHandler));;
  }
  // getKycTaskSummaryList() {
  //   return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo`).pipe(catchError(this.errorHandler));
  // }
  getKycTaskSummaryList(status, page, size) {
    return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo?status=${status}&page=${page}`).pipe(catchError(this.errorHandler));
  }

  getKycDetails(params) {
    return this.http.get<any>(`${API_URL}/customerdata/getCustomerInfo?${params}`).pipe(catchError(this.errorHandler));
  }

  getKycTaskSummary(value) {
    var params;
    params = new HttpParams().append(`customerId`, value);
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomerDetails?${params}`).pipe(catchError(this.errorHandler));
  }
  getKycTaskSummaryAll(paramKey, paramValue) {
    var params;
    const arr = ['customerId', 'firstName'];
    arr.filter(item => {

      if (item.includes(paramKey)) {
        console.log('item', item);
        params = new HttpParams().append(`${item}`, paramValue);
      }
    });
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomerDetails?${params}`).pipe(catchError(this.errorHandler));
  }
  getVideoTaskSummary(phoneNo, primaryEmail) {
    return this.http.get<any>(`${API_URL}/icust-video-verify/fetchInfo?phoneNo=${phoneNo}&primaryEmail=${primaryEmail}`).pipe(catchError(this.errorHandler));
  }

  gettingAvailableSlotsTeller(selectedDate: any, tellerId: any) {
    console.log("Hiiting");
    return this.http.get(`${API_URL}/icust-video-verify/availableSlots?scheduledDate=${selectedDate}&tellerId=${tellerId}`).pipe(catchError(this.errorHandler));
  }
  updateKycStatus(data: Object) {
    return this.http.post<any>(`${API_URL}/customerdata/upsertCustomerDetails`, data).pipe(catchError(this.errorHandler));
  }
  getDashboardRecenetActivities(accountId: any) {
    return this.http.get(`${API_URL}/accountdata/fetchAccount/${accountId}`)
  }
  getDashBoardRecentTransactions(customerId: any) {
    return this.http.get(`${API_URL}/cash-deposit/api/fetchRecentTrans?customerId=${customerId}`)
  }
  getRecentTransaction(accountNumber: any) {
    return this.http.get(`${API_URL}/cash-deposit/api/fetchTransaction?accountNumber=${accountNumber}`)
  }
  getDashboardAccountdata(customerId: any) {
    return this.http.get(`${API_URL}/accountdata/fetchAccount/${customerId}`)
  }
  getDashboardKycData(customerId: any) {
    return this.http.get(`${API_URL}/customerdata/getCustomerInfo?customerId=${customerId}`)
  }

  signInLater(data: any) {
    return this.http.post<any>(`${API_URL}/rest/esignURL/send`, data);
  }

  updateKycStatusByCustId(customerId, kycStatus, custStatus) {
    console.log(customerId)
    // const id=
    // const updateStatus = new FormData();
    var data = {
      customerId: +customerId,
      kycStatus: kycStatus,
      custStatus: custStatus
    };
    // updateStatus.append("data", JSON.stringify(data));
    return this.http.put(`${API_URL}/customerdata/updateKycStatusByCustomerId`, data);
  }

  getCustomerDocuments(customerId, document_type) {
    console.log('in service')
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomerDocuments?customerId=${customerId}&documentType=${document_type}`)
      .pipe(tap(result => {
      }));
  }
  getCustomerDocForIdProof(customerId, document_type, documentSide) {
    console.log('in service')
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomerDocuments?customerId=${customerId}&documentType=${document_type}&documentSide=${documentSide}`)
      .pipe(tap(result => {
      }));
  }
  getSignatureDocuments(customerId) {
    console.log('in service')
    return this.http.get<any>(`${API_URL}/accountdata/fetchSignatureInfo?customerId=${customerId}`)
      .pipe(tap(result => {
      }));
  }
  deleteCustomerDoc(customerId, id) {
    return this.http.delete<any>(`${API_URL}/customerdata/deleteCustDocument?customerId=${customerId}&id=${id}`)

  }
  deleteCustomerSign(accountSignatureId) {
    return this.http.delete<any>(`${API_URL}/accountdata/deleteSignature?accountSignatureId=${accountSignatureId}`)

  }
  getPendingActivities(customerId) {
    console.log("customerId::", customerId)
    return this.http.get<any>(`${API_URL}/dashboard/getPendingActivities?customerId=${customerId}`)
      .pipe(tap(result => {
        console.log("result ::", result)
      }));
  }

  getCustomerByCustomerID(key, value) {
    return this.http.get<any>(`${API_URL}/customerdata/fetchCustomers?${key}=${value}`)
    // .pipe(catchError(this.errorHandler));
  }

  fetchAccountBalanceByAccountId(accountId:any){
    return this.http.get<any>(`${API_URL}/accountdata/accountDetails/${accountId}`);
  }
  
  deleteNomineeById(id, loggedInUser) {
    return this.http.delete(`${API_URL}/customerAccNominee/${id}/${loggedInUser}`).pipe(catchError(this.errorHandler));
  }


  private subject = new BehaviorSubject({});
  getaccParam = this.subject.asObservable();

  sendCIF(message: object) {
    this.subject.next(message);
  }
  getCIf(): Observable<any> {
    return this.subject.asObservable();
  }

  private isKycDataFetched = new BehaviorSubject({});
  kycDataFetched = this.isKycDataFetched.asObservable();

  sendKycDataFetchedInfo(message: any) {
    this.isKycDataFetched.next(message);
  }
  getKycDataFetchedInfo(): Observable<any> {
    return this.isKycDataFetched.asObservable();
  }

  getAccountBranch() {
    return this.http.get<any>(`${API_URL}/branch`)
      .pipe(tap(result => {
      }));
  }
  
}