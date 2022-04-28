
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Injectable({
 providedIn: 'root'
})


export class ShowMessageService {

 constructor(private toast: ToastrService) { }


 errorData: { code: any, message: string }[] = [
   { "code": 400, "message": "Bad Request" },
   { "code": 401, "message": "Unauthorized" },
   { "code": 403, "message": "Forbidden" },
   { "code": 404, "message": "Not Found" },
   { "code": 500, "message": "Internal Server Error" },
   { "code": 502, "message": "Bad Gateway" },
   { "code": 503, "message": "Service Unavailable" },
   { "code": 504, "message": "Gateway Timeout" },
   { "code": 0, "message": "Error" },
   { "code": 204, "message": "No Content" },
 ];

 errorMessage(status: any,errorResp) {
   console.log("API Response Status :",status);
   console.log(errorResp);
   console.log(errorResp.error.message);
   var msg="";
    if(errorResp && errorResp.error && errorResp.error.message){
      msg=errorResp.error.message;
    }
       
   let i = 0;

   // if(errorResp.error.responseMessage){

   // }
   // if(errorResp.error)
   // {
   //   Swal.fire({
   //     icon: 'error',
   //   //  title:"Error Code : "+this.errorData[i].code ,
   //    text:"Error message : "+errorResp.error,
       
   //     width:500,
   //     // timer: 10000,
   //     // timerProgressBar: true,
   //     confirmButtonText: "OK",
     
   //     confirmButtonColor:'#456EFE'
   //   })
   //   return false;
   // }
   while (i < this.errorData.length) {
     if (this.errorData[i].code === status) {
       var errCode=status.toString()
       if(msg == ""){
        msg = this.errorData[i].message;
       }
       console.log("errcode :: ",errCode)
       Swal.fire({
         icon: 'error',
         title:"Error Code : "+this.errorData[i].code ,
       //  text:"Error message : "+this.errorData[i].message,
         text:"Error message : "+msg,
         
         width:500,
         // timer: 10000,
         // timerProgressBar: true,
         confirmButtonText: "OK",
       
         confirmButtonColor:'#456EFE'
       })
     }
     i++;
   }

 }
 errMsg(err)
 {
   Swal.fire({
     icon: 'error',
     
     confirmButtonText: "OK",
   
     confirmButtonColor:'#456EFE'
   })
 }




}