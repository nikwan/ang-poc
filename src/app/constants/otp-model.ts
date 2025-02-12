export interface OtpRequest {
    aadhaar: string;      
    requestId: string;    
    retryCount: number;   
  }
  
  
  export interface OtpResponse {
    status: string;       
    frm: string;          
    msg: string;          
    otpTxn: string;       
    retryCount: number;   
  }