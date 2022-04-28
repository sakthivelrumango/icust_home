import { MatDialog } from '@angular/material/dialog';
import { Inject, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../api.service';
import { AccountServiceSummaryComponent } from 'app/views/home/application-entry-stage/account-service-summary/account-service-summary.component';
import { MandateSummaryComponent } from 'app/views/home/application-entry-stage/mandate-summary/mandate-summary.component';
import { NomineesSummaryComponent } from 'app/views/home/application-entry-stage/nominees-summary/nominees-summary.component';
import { AccountDetailsSummaryComponent } from 'app/views/home/application-entry-stage/account-details-summary/account-details-summary.component';
import { CustomerInformationDetailsSummaryComponent } from 'app/views/home/application-entry-stage/customer-information-details-summary/customer-information-details-summary.component';
import { ReportDetailsComponent } from 'app/views/home/application-assessment/report-details/report-details.component';
import { ScoreboardDetailsComponent } from 'app/views/home/application-assessment/scoreboard-details/scoreboard-details.component';
import { ConfirmDialogComponent } from 'app/views/others/confirm-dialog/confirm-dialog.component';
import { KycVerificationMethodComponent } from 'app/views/others/kyc-verification-method/kyc-verification-method.component';
import { KycBranchVerifySummaryComponent } from 'app/views/tasks/kyc-branch-verify-summary/kyc-branch-verify-summary.component';
import { SuccessDialogueComponent } from 'app/views/others/new-customer-onboarding/success-dialogue/success-dialogue.component';
import { CustomerTypeComponent } from 'app/views/others/customer-type/customer-type.component';
import { AlertDiaglogComponent } from 'app/views/home/limit-entry-stage/alert-diaglog/alert-diaglog.component';




@Injectable({
  providedIn: 'root'
})
export class DialogService {
  AccountOpenComponent() {
  throw new Error('Method not implemented.');
  }

  constructor(
    public dialog: MatDialog,private apiService:ApiService, @Inject(DOCUMENT) private _document: Document
  ) { }
 accountserviceDialog(){
     const tokenDialog = this.dialog.open(AccountServiceSummaryComponent, {
       data:{},
        width: '60%',
      height: '57%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    tokenDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 

  }
  
   mandateDialog(){
    console.log("Logout Response");
     const dialogBox = this.dialog.open(MandateSummaryComponent, {
       data:{},
        width: '65%',
      height: '65%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    dialogBox.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 

  }

  nomineeDialog(): void {
    console.log("test");
    const dialogRef = this.dialog.open(NomineesSummaryComponent, {
      width: '65%',
      height: '70%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  qualitativeSummaryDialog():void
  {
    const dialogRef = this.dialog.open(ReportDetailsComponent, {
      width: '55%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  assessmentSummaryDialog():void
  {
    const dialogRef = this.dialog.open(ScoreboardDetailsComponent, {
      width: '55%',
      maxHeight: '90%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  accountDetailsSummaryDialog(): void {
    const dialogRef = this.dialog.open(AccountDetailsSummaryComponent, {
      width: '60%',
      maxHeight: '90%',
      backdropClass: 'dialog-bg-trans',
      height: '90%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  kycBranchVerificationSummary(): void {
    const dialogRef = this.dialog.open(KycBranchVerifySummaryComponent, {
       width: '80%',
      maxHeight: '100%',
      // height: '500%',
      backdropClass: 'dialog-bg-trans',
      // height: '75%',
      disableClose: true,
    });
    // this.addClientDialogRef.afterClosed().subscribe(() => { this.getAllClients(); } );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      return result;
    });

  }

  customerInformationDetailsSummaryDialog(): void {
    const dialogRef = this.dialog.open(CustomerInformationDetailsSummaryComponent, {
      width: '75%',
      backdropClass: 'dialog-bg-trans',
      height: '90%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  openKycVerificationMethod(): void {
    const dialogRef = this.dialog.open(KycVerificationMethodComponent, {
      width: '75%',
      backdropClass: 'dialog-bg-trans',
      maxHeight: '90%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  openCustomerType(): void {
    const dialogRef = this.dialog.open(CustomerTypeComponent, {
      width: '55%',
      backdropClass: 'dialog-bg-trans',
      maxHeight: '90%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  confirmationDialog(namePancard,name) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
      data: { nameInUpload: namePancard, nameInBasicTab: name },
    });

    return dialogRef.afterClosed();

  }

  customerOnboardingSuccessDialogue():void
  {
    const dialogRef = this.dialog.open(SuccessDialogueComponent, {
      width: '65%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._document.defaultView.location.reload();
    });
  }

  alertDialog() {
    console.log("inside alertDialog")
    const dialogRef = this.dialog.open(AlertDiaglogComponent, {
      width: '40%',
      backdropClass: 'dialog-bg-trans',
      disableClose: true,
    });

    return dialogRef.afterClosed();

  }

}
