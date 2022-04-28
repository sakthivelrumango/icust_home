
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/config/app.constant';
import { from, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export const API_URL = AppConstants.baseURL;
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
  mode: 'no-cors'

};
@Injectable({
  providedIn: 'root'
})
export class FingerPrintCaptureService {


  constructor(private http: HttpClient,
    private snack: MatSnackBar) {
  }

  /* NOTE:
  biometric call type: webapi
  lisence: used 60 free trail version
  desc: currently using this service for finger print capturing
   */

  fpobject: any;
  CallingSGIFPGetData1() {
    // var uri = "http://localhost:8000/SGIFPCapture";

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.setRequestHeader('X-PINGOTHER', 'pingpong');
    // xmlhttp.setRequestHeader('Content-Type', 'application/json');
    // xmlhttp.onreadystatechange = function () {
    //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //     var fpobject = JSON.parse(xmlhttp.responseText);
    //     console.log("fpobject :: ", fpobject);
    //     // successCall(fpobject);
    //   }
    //   else if (xmlhttp.status == 404) {
    //     // failCall(xmlhttp.status)
    //   }
    // }
    // xmlhttp.onerror = function () {
    //   // failCall(xmlhttp.status);
    // }
    // xmlhttp.open("POST", uri, true);
    // xmlhttp.send();
    return this.http.get(`http://localhost:8000/SGIFPCapture`);//8443
  }



  /* To-Do: Localhost api */
  CallingSGIFPGetData(): Observable<any> {
    return this.http.get('http://localhost:8000/SGIFPCapture')
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })
      );
  }

  /* To-Do: https api capture */
  CallingSGIFPCapture(): Observable<any> {
    console.log(" in service ")
    return this.http.get('https://localhost:8443/SGIFPCapture')
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })
      );
  }

  callingSGIFPCaptureFromJava(): Observable<any> {
    console.log(" in service ")
    return this.http.get(`${API_URL}/fingerPrintCapture/captureFingerPrint`)
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })

      );
  }

  /* To-Do: https api capture */
  CallingSGIFPMatch(templeData1: any, templeData2: any): Observable<any> {
    var secuLicc = "ae7VmpMA9ZwEGVYVr1LMWrqjCEx+eFmya9VX0v+vNfQ=";
    var params = new HttpParams()
      .append('template1', templeData1)
      .append('template2', templeData2)
    //  .append('licstr',secuLicc);
    //  .append('licstr',secuLicc);
    // http://localhost:8000/SGIMatchScore
    return this.http.post(`https://localhost:8443/SGIMatchScore`, params)
      .pipe(
        tap((result) => {
          // console.log('result-->', result)
          return result;
        })

      );
  }

  matchCapturedFp(fpId, capturedData) {
    console.log('in finger print match service')
    return this.http.post<any>(`${API_URL}/rest/upload/getRegisteredCustomerData/${fpId}`, capturedData)
      .pipe(
        tap((result) => {
          // console.log('result-->', result)
          return result;
        })
      );
  }

  handleError(arg0: string, arg1: undefined[]): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }


  /* NOTE:
  biometric call type: registered device service
  lisence: paid
  desc: currently not using this service
   */
  rdservice() {
    var port;
    var urlStr = '';
    urlStr = 'http://localhost:11100/';

    console.log(" in service ")
    return this.http.get(`http://localhost:11100/`)
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })

      );
  }
  getJSON_rd: any = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('RDSERVICE', url, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
  };

  saveBiometric(capFingerPrint, fingerName, cId, screen) {
    return this.http.post<any>(`${API_URL}/rest/upload/saveOrUpdateBio/${fingerName}/${cId}/${screen}`, capFingerPrint);
  }

  errorCodeService(errorCode) {
    var error = '';
    if (errorCode == 1) {
      error = 'Creation failed : A driver is missing/not correctly configured';
    }

    if (errorCode == 3) {
      error = 'Please check again. Either driver is corrupted or Device is not connected';
    }
    if (errorCode == 2) {
      error = 'Function failed ';
    }

    if (errorCode == 51) {
      error = 'System file load failure';
    }
    if (errorCode == 52) {
      error = 'Sensor chip initialization failed';
    }
    if (errorCode == 53) {
      error = 'Sensor line dropped';
    }

    if (errorCode == 54) {
      error = 'Timeout/Failed to scan. Clean your fingers and try again';
    }

    if(errorCode == 103 || errorCode == 104 || errorCode == 106){
      error ='Match failed , try again'
    }

    console.log('error :: ', error);
    this.snack.open(`${error}`, 'OK', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }

  getCustInfoByFp(page, size, fingerIndex) {
    var params;
    // if ((fingerIndex != 0) && page == 0) {
    //   console.log('only fingerIndex')
    //   params = new HttpParams().append('fingerIndex', fingerIndex);
    // } else {
      console.log(`fingerIndex ${fingerIndex} and page ${page}`)
      params = new HttpParams().append('fingerIndex', fingerIndex);//.append('page', page);
    // }
    return this.http.get<any>(`${API_URL}/rest/upload/getCustomerDataByFp?${params}`);
  }

}
