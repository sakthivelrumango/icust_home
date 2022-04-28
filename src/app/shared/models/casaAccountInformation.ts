// export class CasaAccountInformation{
// // Deposit:string;
// children?: TypeOfTransaction[];

import { Time } from "@angular/common";

// }
export class TypeOfTransaction{
    typeOfTransaction:string;
    transactionAmount:number;
    // children?: AccountDetails[];
   }
export class DailyAvgSpend{
   avgSpendDate:Date;
   avgSpendAmount:number; 
   depositAmount:number;
} 
export class DrVsCr{
    avgDrCrDate:Date;
    avgCreditAmount:number;
    avgDebitAmount:number;
}  
export class CasaRecentActivities {
    trndate: string;
    trnTime:Time;
    trnDesc: string;
    drCr: string;
    trnAmt: number;
    trnCcy: string;
   }