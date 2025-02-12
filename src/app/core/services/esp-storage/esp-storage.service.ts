import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TxnInfo } from '../../../constants/txn-info';
import { GenerateOtpResponse } from '../../../constants/generate-otp-response';
import { StorageService } from '../storage/storage.service';
import { StorageKeys } from '../../../constants/storage-keys';

@Injectable()
export class EspStorageService {
  txnInfo!: TxnInfo;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  checkIfTransactionIsActive(txnId: string) {
    let queryParams ={
      "txn_id":txnId
    }
    return new Promise((resolve, reject) =>{
      this.apiService.checkTransactionStatus(queryParams).subscribe({
        next: (res) => {
          this.storageService.clear();
          this.loadResponseToSession(res);
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  loadResponseToSession(data: any){
    Object.keys(data).forEach(key =>{
        if(data[key] != null){
            this.storageService.set(key, data[key]);
        }
    })
  }

  loadTemplateData() {
    const [signDate, signTime] = this.storageService.get(StorageKeys.REQUEST_TIME)!.split(' ');
    const [keyword_1, keyword_2] = JSON.parse(this.storageService.get(StorageKeys.KEYWORDS)!);
    const aspTxnId = this.storageService.get(StorageKeys.ASP_TXN_ID)!;
    const aspName = this.storageService.get(StorageKeys.ASP_NAME)!;
    const espName = this.storageService.get(StorageKeys.ESP_NAME)!;
    const response_url = this.storageService.get(StorageKeys.RESPONSE_URL)!;
    const client_logo = this.storageService.get(StorageKeys.CLIENT_LOGO)!;

    const theme = window.sessionStorage.getItem('theme')!;
    if(theme) {
       document.documentElement.style.setProperty(
          `--primary-color`,
          theme
        );
    }

    this.txnInfo = {
      signDate: signDate,
      signTime: signTime,
      keyword_1: keyword_1,
      keyword_2: keyword_2,
      aspTxnId: aspTxnId,
      aspName: aspName,
      espName: espName,
      response_url: response_url,
      client_logo: client_logo
    }
  }

  fetchOtpConfigData(): GenerateOtpResponse {
    const otpConfig: GenerateOtpResponse =  {
      otp_retries: Number(this.storageService.get(StorageKeys.OTP_RETRIES)!),
      otp_timer: Number(this.storageService.get(StorageKeys.OTP_TIMER)!),
      otp_txn_id: this.storageService.get(StorageKeys.OTP_TXN_ID)!,
      mobile: this.storageService.get(StorageKeys.MOBILE)!,
      identifier: this.storageService.get(StorageKeys.IDENTIFIER)!
    }
    return otpConfig
  }
}
