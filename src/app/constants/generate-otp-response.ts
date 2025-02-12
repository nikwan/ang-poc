export interface GenerateOtpResponse {
    mobile: string;
    identifier: string;
    otp_timer: number;
    otp_retries: number;
    otp_txn_id: string;
}