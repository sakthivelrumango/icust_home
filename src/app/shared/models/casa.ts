export class CASA{
    type:string;
    children?:AccountTypes[];
  }

  export class AccountTypes{
    AccountType:string;
    children?: AccountDetails[];
   }

  export class AccountDetails{
   accountNo:string;
   accountStatus:string;
   currency:string;
   accountBalance:number;
  }
 