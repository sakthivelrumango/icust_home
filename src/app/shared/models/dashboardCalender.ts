export class DashboardCalender{
  
    type:string;
    children?: Date[];
  }

  export class Date{
    scheduleDate:string;
    children?: Time[];
  }
  export class Time{
    scheduleTime:string;
    
  }