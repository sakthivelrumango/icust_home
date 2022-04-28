export class Customer{
    customerId:string;
    customerName:string;
    customerImage:string;
    kycVerified:string;
    mobileNo:string;
    emailId:string;
    pendingRequest?:PendingRequest[];
    pendingActivities?:PendingActivities[];
    recentActivitiesDates?:RecentActivitiesDates[];
    cards?:Cards[];
    dependents?:Dependents[];
    accountOverview?:AccountOverview[];
    incomeVsExpenses?:IncomeVsExpenses[];
}
export class Dependents{
  avatar:string;
}
export class PendingRequest {
    requestType:string;
    prdate: string;
    pendReqRead: string;
  }

  export class PendingActivities {
    requestType:string;
    padate: string;
    pendActRead:boolean;
  }

  export class RecentActivitiesDates {
    trndate: Date;
  recentActivities?:RecentActivities[];
   }

   export class RecentActivities {
   
    trnDesc: string;
    drCr: string;
    trnAmt: number;
    trnCcy: string;
   }

   export class Cards{
    typeOfcard:string;
    cardAmount:number;
    cardCurrency: string;
    cardNo:string;
    cardExpiryDate:string;

}
export class AccountOverview{
    typeOfAccount:string;
    countOfAccount:number;
    totalBalance:number;
    
}

export class IncomeVsExpenses{
  // type:string;
  income?:Income[];
  expenses?:Expenses[];
}
export class Income{
months:string;
amount:number;
}
export class Expenses{
  months:string;
  amount:number;
}

