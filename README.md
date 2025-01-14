
# Protean ESP

Esign API for Esign

## End Points

 - [UAT](https://agw.dev.esign.proteantech.in/nsdl-esp)
 - [AUTHENTICATE](https://agw.dev.esign.proteantech.in/nsdl-esp/authenticate/esign-doc/)
 - [OTP](https://agw.dev.esign.proteantech.in/nsdl-esp/authenticate/esign-doc/)
 - [OTP_VERIFIACTION](https://agw.dev.esign.proteantech.in/nsdl-esp/authenticate/esign-doc/)
 - [CANCEL](https://agw.dev.esign.proteantech.in/nsdl-esp/authenticate/esign-doc/)
 - [USER_EXPIRY](https://agw.dev.esign.proteantech.in/nsdl-esp/authenticate/esign-doc/)
 - [CUSTOM_UI](https://agw.dev.esign.proteantech.in/nsdl-esp/digio/)
 

## API Reference

#### 1. Authenticate

```http
  POST /authenticate/esign-doc/
```
Post XML to this endpoint will redirect on APP UI (CUSTOM_UI) on successful authentication and failure as well

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `msg` | `string` | **Required**. Signed XML |

#### 2. OTP Request
OTP Request Endpoint

```http
  POST /authenticate/otp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `aadhaar`      | `string` | **Required**. UID |
| `requestId`      | `string` | **Required**. requestId |
| `retryCount`      | `int` | **Required**. retryCount |

#### 2.1 Request with wrong aadhaar number
**Request**
```
{
  "aadhaar": "121212121212",
  "requestId": "1733293206911153935",
  "retryCount": 1
}
```
**Response**
```
{
    "status": "0",
    "frm": "<form action='/nsdl-esp/authenticate/es' id='esid' method='post'> <input type='hidden' id='kid' name = 'kid' value='1733293206911153935'/> <input type='submit' value='submit'></form> ",
    "msg": "UIDAI Authentication Error: 998, Invalid Aadhaar Number/Virtual ID. 3 attempt(s) remaining for OTP.",
    "otpTxn": "",
    "retryCount": 3
}
```

Show `msg` on UI as per response received

**Note**: After retrycount exahusted don't show RESEND OTP link.

#### 2.3 Request with correct aadhar number
**Request**
```
{aadhaar: "36633681****", requestId: "1733293206911153935", retryCount: 2}
```
**Response**
```
{
    "status": "1",
    "frm": "",
    "msg": "otp sent on registered mobile/email id.",
    "otpTxn": "STGSK0013:20241204115213966:11865",
    "retryCount": 2
}
```
**Note**: After retrycount exahusted don't show RESEND OTP link.

Will receive OTP on registered UID mobile no via UIDAI. 

#### 3. OTP Verification (KYC)
OTP Verification Endpoint

```http
  POST /authenticate/otpAction
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `aadhaar`      | `string` | **Required**. UID |
| `otp`      | `string` | **Required**. otp recived on mobile |
| `otpTxn`      | `string` | **Required**. otpTxn received from OTP from request |
| `requestId`      | `int` | **Required**. requestId |

#### 3.1 Request with wrong OTP

**Request**
```
{"otp":"121212","otpTxn":"STGSK0013:20241204115213966:11865","aadhaar":"366336811995","requestId":"1733293206911153935"}
```
**Response**
```
{
    "status": "FAIL",
    "frm": "<p>otp verification failed !</p>",
    "msg": "Invalid OTP!. Please enter correct OTP which was received. 2 attempt(s) remaining for submitting the OTP.",
    "otpTxn": "",
    "retryCount": 2
}
```
**Notes**: 
Show `msg` on UI as per response received. 

#### 3.2 Request with correct OTP
**Request**
```
{"otp":"881080","otpTxn":"STGSK0013:20241204115213966:11865","aadhaar":"366336811995","requestId":"1733293206911153935"}
```
**Response**
```
{
    "status": "OK",
    "frm": "<form action='http://172.18.2.90:2000/ESPTestCall/NSDLEsignTestAction?f=tRgz3NogX9LD60hZqe6lPdBZuzP5DC30Ze86CK71N3oaH95OL0oxmAjMPmTFqa_PQnfMdGzAMrcf2kkwJfGC-EYvrshLCjZhBiO7-Af5YDmRiBa64b0365hL7O8Ix5bAw5ipK6wtMxAunS12ksvPoEcPGBZAJqZAfR1OdOd5kD4yn8XffYG0y1MrAtKuqoDESVfAoUyLb-7wolJjWyV42TSYuhDdfbU-fuuhsHW8-B8Wyci8yBl0I0PDv8I74Tot4W97WtetaRoXqNqfbdqOG7DuKZiikK0BfBAe1R0tzeJhT-19CKLcoKZfIMCeDpkjtFhlOtf8BdZnS5K8I8V8g8eRaN0juyXrHWlG1BofnXNRb_iUZKZUtIfjX0fEmvDm4aot018KeYN6hWgD9d-np2xvtMVQHUvOaYF_cOoqlwnQgWdLdfZmlQcKpt5Z-E54' id='esid' method='post' enctype='multipart/form-data'> <input type='hidden' id='msg' name = 'msg' value='<?xml version=\"1.0\" encoding=\"UTF-8\"?><EsignResp errCode=\"NA\" errMsg=\"NA\" resCode=\"D2267EC05F8A49FE83B8E842C264A5AB\" status=\"1\" ts=\"2024-12-04T11:55:23\" txn=\"UKC:eSign:3290:20241204115005938\"><UserX509Certificate>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</UserX509Certificate><Signatures><DocSignature error=\"\" id=\"1\" sigHashAlgorithm=\"SHA256\">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</DocSignature></Signatures><Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><CanonicalizationMethod Algorithm=\"http://www.w3.org/TR/2001/REC-xml-c14n-20010315\"/><SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><Reference URI=\"\"><Transforms><Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><DigestValue>hGyprOQ9H6VBnbGqRJUaLcPkJVptaPjt6Pe8836HfOY=</DigestValue></Reference></SignedInfo><SignatureValue>mMX6W+U7i+u8drxMeAyi7LCSyVvFBln54JqT138gxOyAREgvZVJpHGXk/2dt7UMnFqMOfFpX7evu&#13;\r\nCIGb6yJ6f/VNN6IYdgYqEU8GsiDZNR/bxgWPOPiBicbzJUg4ZjYFvCd3+jr8DL2Ud1ALwMWRfWDi&#13;\r\nMSld9hcWRkG1WEvFhXackBcTjDwmt7STqJYCLdEl2fS4rj9b0H55EJ597NQ+6Ye44+zLHeHzyecG&#13;\r\n2aL6apTd74twEx1Z52isLGiAFzrKWx2DfdmwiDYOEoXHf/9Ar7zXlbrhpxqQnAypLlQJpXxWHfK1&#13;\r\nL3aa2/pLRWIHEKC8VLe4yqKEKmmtW/tFB6y7rQ==</SignatureValue><KeyInfo><KeyValue><RSAKeyValue><Modulus>u/tSm+BapxblgQ9mE3pmYjAWlBKHAHPD+LCus6jKclpBG35pVuQbFYngLZd0vTzSxeavcbpGiw9Q&#13;\r\n6OpLbBrjOJYpah05ZAH81zgHw6JUaGHwOoAOQvwJ3RynopAAsWj6cqmxaDF6QpoEnqBTBHOHncQx&#13;\r\ncKWrPbFCNfqIkKKqDfsoZ/TMzr3htLKIuoUBTy1kt59RPzRwb0RIbrAvmLPJ4/lYAhJHJyC9ZOKV&#13;\r\n27V49H2dKBzi0wL0KiZwg+xgwI51qUyS3xJitYKjpYTc4ZcB3f8wdEAY0TABi9COuJMfiKRbZfSt&#13;\r\n6t0pZ3mfRpeWRLEKHZ1OD5wU3Fn4rtoMD39spQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue><X509Data><X509SubjectName>CN=DS Protean eGov Technologies Limited 03,2.5.4.5=#134062323434656635656564373764383861336439626435656231663439343861646130323134633462616134613134656435613534343864613466333935656566,2.5.4.51=#0c3231535420464c4f4f52202054494d455320544f57455220204b414d414c41204d494c4c5320434f4d504f554e44202053454e,STREET=Mumbai,ST=Maharashtra,2.5.4.17=#0c06343030303133,OU=UID OPERATIONS,O=Protean eGov Technologies Limited,C=IN</X509SubjectName><X509Certificate>MIIHEzCCBfugAwIBAgIFcrcmVdUwDQYJKoZIhvcNAQELBQAwgZMxCzAJBgNVBAYTAklOMS0wKwYD&#13;\r\nVQQKEyRDYXByaWNvcm4gSWRlbnRpdHkgU2VydmljZXMgUHZ0IEx0ZC4xHTAbBgNVBAsTFENlcnRp&#13;\r\nZnlpbmcgQXV0aG9yaXR5MTYwNAYDVQQDEy1DYXByaWNvcm4gU3ViIENBIGZvciBEb2N1bWVudCBT&#13;\r\naWduZXIgRFNDIDIwMjIwHhcNMjMwNDI1MTIzMTU1WhcNMjUwNDI1MTIzMTU1WjCCAUQxCzAJBgNV&#13;\r\nBAYTAklOMSowKAYDVQQKDCFQcm90ZWFuIGVHb3YgVGVjaG5vbG9naWVzIExpbWl0ZWQxFzAVBgNV&#13;\r\nBAsMDlVJRCBPUEVSQVRJT05TMQ8wDQYDVQQRDAY0MDAwMTMxFDASBgNVBAgMC01haGFyYXNodHJh&#13;\r\nMQ8wDQYDVQQJDAZNdW1iYWkxOzA5BgNVBDMMMjFTVCBGTE9PUiAgVElNRVMgVE9XRVIgIEtBTUFM&#13;\r\nQSBNSUxMUyBDT01QT1VORCAgU0VOMUkwRwYDVQQFE0BiMjQ0ZWY1ZWVkNzdkODhhM2Q5YmQ1ZWIx&#13;\r\nZjQ5NDhhZGEwMjE0YzRiYWE0YTE0ZWQ1YTU0NDhkYTRmMzk1ZWVmMTAwLgYDVQQDDCdEUyBQcm90&#13;\r\nZWFuIGVHb3YgVGVjaG5vbG9naWVzIExpbWl0ZWQgMDMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw&#13;\r\nggEKAoIBAQC7+1Kb4FqnFuWBD2YTemZiMBaUEocAc8P4sK6zqMpyWkEbfmlW5BsVieAtl3S9PNLF&#13;\r\n5q9xukaLD1Do6ktsGuM4lilqHTlkAfzXOAfDolRoYfA6gA5C/AndHKeikACxaPpyqbFoMXpCmgSe&#13;\r\noFMEc4edxDFwpas9sUI1+oiQoqoN+yhn9MzOveG0soi6hQFPLWS3n1E/NHBvREhusC+Ys8nj+VgC&#13;\r\nEkcnIL1k4pXbtXj0fZ0oHOLTAvQqJnCD7GDAjnWpTJLfEmK1gqOlhNzhlwHd/zB0QBjRMAGL0I64&#13;\r\nkx+IpFtl9K3q3SlneZ9Gl5ZEsQodnU4PnBTcWfiu2gwPf2ylAgMBAAGjggK4MIICtDA0BgNVHSUE&#13;\r\nLTArBggrBgEFBQcDBAYIKwYBBQUHAwIGCisGAQQBgjcKAwwGCSqGSIb3LwEBBTAfBgNVHSMEGDAW&#13;\r\ngBTyft39pIs9pkxM8v3vUzMXCsp+yTCBnwYIKwYBBQUHAQEEgZIwgY8wKwYIKwYBBQUHMAGGH2h0&#13;\r\ndHA6Ly9vY3NwLmNlcnRpZmljYXRlLmRpZ2l0YWwwYAYIKwYBBQUHMAKGVGh0dHA6Ly93d3cuY2Vy&#13;\r\ndGlmaWNhdGUuZGlnaXRhbC9yZXBvc2l0b3J5L0NhcHJpY29yblN1YkNBZm9yRG9jdW1lbnRTaWdu&#13;\r\nZXJEU0MyMDIyLmNlcjCB9wYDVR0gBIHvMIHsMFYGBmCCZGQCAzBMMEoGCCsGAQUFBwICMD4aPENs&#13;\r\nYXNzIDMgQ2VydGlmaWNhdGUgaXNzdWVkIGJ5IENhcHJpY29ybiBDZXJ0aWZ5aW5nIEF1dGhvcml0&#13;\r\neTBEBgZggmRkCgEwOjA4BggrBgEFBQcCAjAsGipPcmdhbml6YXRpb25hbCBEb2N1bWVudCBTaWdu&#13;\r\nZXIgQ2VydGlmaWNhdGUwTAYHYIJkZAEKAjBBMD8GCCsGAQUFBwIBFjNodHRwOi8vd3d3LmNlcnRp&#13;\r\nZmljYXRlLmRpZ2l0YWwvcmVwb3NpdG9yeS9jcHN2MS5wZGYwXgYDVR0fBFcwVTBToFGgT4ZNaHR0&#13;\r\ncDovL3d3dy5jZXJ0aWZpY2F0ZS5kaWdpdGFsL2NybC9DYXByaWNvcm5TdWJDQWZvckRvY3VtZW50&#13;\r\nU2lnbmVyRFNDMjAyMi5jcmwwHQYDVR0OBBYEFCt9CqBrD+0r6Er+HAkjwbZ8GwSwMCIGA1UdEQQb&#13;\r\nMBmBF2F2aW5hc2hrQHByb3RlYW50ZWNoLmluMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgbA&#13;\r\nMA0GCSqGSIb3DQEBCwUAA4IBAQBV8kRGQJV5VPOkwriP/57wutIn2hDc8xrWjITxmw0UVpJS4/8v&#13;\r\nfceQq+peu9VE2k389GkzcB63yPGcfilqsD13CL/ha4IK8WLKs1Yq81e9FixVLQ7WuDavOlo24jjR&#13;\r\nS5NO+hyrEoyr+RDB6MgvmMPZ4dvM74C5jou4JGs9vyCyBMLjF0uphJCjHpd+wlxYOFB1O+PvQ5pN&#13;\r\njnbrCBGziJgozqdDqMiQGJ0oBFuvmS8RDEGXl1vCKUYFBHDdbAEVai4x+HmeFg5VrQ/2SoVOXlW0&#13;\r\nbsBdpMYdVUaGoBETeT3ZuEHi4JqZnpGUITRtz0i4JRdXjJU0cD8rBBj6YB5cjx/I</X509Certificate></X509Data></KeyInfo></Signature></EsignResp>'/> <input type='submit' value='submit'></form> ",
    "msg": "",
    "otpTxn": "",
    "retryCount": 0
}
```
**Notes**: 
Show `msg` value on UI as per response received. Will recived esigned response alon awith repoulated form inside `frm` attribute of response. Form attribute `frm` will posted to the given action url of the form which is response utl of ASP.

#### 4. Resend OTP
Resend OTP Request

```http
  POST /authenticate/otp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `aadhaar`      | `string` | **Required**. UID |
| `requestId`      | `string` | **Required**. requestId |
| `retryCount`      | `int` | **Required**. retryCount |

#### 4.1 Request for resend OTP

**Request**
```
{"aadhaar":"366336811995","requestId":"1733293670041241794","retryCount":2}
```
**Response**
```
{
    "status": "1",
    "frm": "",
    "msg": "otp sent on registered mobile/email id.",
    "otpTxn": "STGSK0013:20241204115841410:17022",
    "retryCount": 2
}
```
**Notes**: 
Show `msg` on UI as per response received. Will received `retryCount` adjust the retry attemtp as per.

#### 5. Client Side Validation
OTP

```http
  POST /authenticate/otp
```

| Validation | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `checked consent`      | `checkbox` | **Required**. checkbox checked is mandatory to enable Send OTP Button |
| `aadhaar`      | `Input` | **Required**. Aadhar Input |
| `requestId`      | `numeric` | **Required**. Mandatory Required To Sycn with ESP   |
| `Loader`      | `HTML Element` | **Required**. Mandatory to stop once response comes from server side   |
| `Response.status=1`      | `JSON` | **Required**. message should display from msg value  from response  | 
| `Response.status=1.`      | `JSON` | **Required**. otpTxn  will have to save the otpTxn somewhere, and it will need to be sent in the next call.
|`Resend Button if status is 1.`  |  Button | **Required**.enable after 30 second if status is 1
| `Response.status=2` | `JSON` | **Required**. if(retryCount <= 0), display error message from response.msg
| `Response.status not 1 or 2` | `JSON` | **Required**. For any unknown or internal error if any, need to enable OTP error  and display message from response

#### 6. Client Side Validation
OTP Verification

```http
  POST /authenticate/otpAction
```

| Validation | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Response.msg`      | `String` | **Condition Check**. if `result.msg.indexOf("-") == 1`. Replaces the content of the HTML element with the ID `f` using `$("#f").html(result.frm)`;Submits the form with the ID esid. i.e.`$("#esid").submit()`;
| `Response.status` | `String` | **Condition Check**. `if( result.status == 'OK')`, Display OTP verified. `result.frm` value must contain valid HTML content to replace the content of `#f` (its a id in a html). The form with ID esid is submitted.
| `Response.retryCount` | `String` | **Condition Check**. `if(result.retryCount != undefined && result.retryCount <= 0)`. `result.frm` value must contain valid HTML content to replace the content of `#f` (its a ID in a HTML). The form with ID esid is submitted.

#### 7. ReSend OTP
OTP ReSend Validation Strategy 

```http
  POST /authenticate/otp
```
| Validation | Type     | Description                      |
| :-------- | :------- | :-------------------------------- |
| `Response.retryCount`      | `String` | **Condition Check**. `if(result.retryCount <= 0 && result.status == 0)` This is the case to abort the request. 

```
$("#f").html(result.frm); frm comes from the response
$("#esid").submit();``` submit the form by populating result of frm in esid

if(result.msg.indexOf("-") == 1) // msg comes from response
$("#f").html(result.frm); //f is the id, frm is the response from server
$("#esid").submit(); // submit the form
```

#### 8. Transaction Details API v1.0


```http
  GET http://172.18.2.91:8888/nsdl-esp/authenticate/custom/txn-details/1733830427175821039/
```
```
Response
{
  "sts": -1,
  "reqDate": "2024-12-10T17:03:46",
  "aspTxnId": "UKC:eSign:3141:20241210170346711",
  "espName": "Protean eGov Technologies Limited (formerly NSDL e-Governance Infrastructure Limited)",
  "v1": "For Testing and Integration of eSign UAT.",
  "v2": "UAT Testing Digitally Signing documents for availing Application Service Provider (ASP) services provided by Protean.",
  "v3": "Testing RSA Algo",
  "aspId": "ESTESTNSDLPUMAKMGAQ3",
  "maxOTPRetryAttempt": 3
}
```
# 9. User Interface Expired

| **Field**       | **Details**                                                                                                                                                                                                                                                |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API Name**     | User Interace Expiry                                                                                                                                                                                                                                         |
| **Method**       | POST                                                                                                                                                                                                                                                       |
| **Endpoint**     | `/nsdl-esp/authenticate/esignCancelRedirect?kid=1733293670041241794&cr=exp`                                                                                                                                                                                                                     |
| **Description**     | `Response contains dynamic form as we are doing client side posting.`                 |
| **Query String** | `kid=1733293670041241794&cr=exp`  
                                                                                                              
## Response

```json
{
    "status": "OK",
    "frm": "<form action='http://172.18.2.91:8084/ESPTestCall/NSDLEsignTestAction?f=tRgz3NogX9LD60hZqe6lPdBZuzP5DC30Ze86CK71N3oaH95OL0oxmAjMPmTFqa_PU-lEYIt_m4thb1vT99ewYIPR4WzRu-ZHPWPcZzlaev6RiBa64b0365hL7O8Ix5bAw5ipK6wtMxAunS12ksvPoEcPGBZAJqZAfR1OdOd5kD4yn8XffYG0y1MrAtKuqoDESVfAoUyLb-7wolJjWyV42TSYuhDdfbU-fuuhsHW8-B8Wyci8yBl0I0PDv8I74Tot4W97WtetaRoXqNqfbdqOG7DuKZiikK0BfBAe1R0tzeJhT-19CKLcoKZfIMCeDpkjtFhlOtf8BdZnS5K8I8V8g8eRaN0juyXrHWlG1BofnXPke8S_6C3qytduJevfoGtn4aot018KeYN6hWgD9d-np2xvtMVQHUvOaYF_cOoqlwnQgWdLdfZmlQcKpt5Z-E54' id='esid' method='post' enctype='multipart/form-data'> <input type='hidden' id='msg' name = 'msg' value='<?xml version=\"1.0\" encoding=\"UTF-8\"?><EsignResp errCode=\"ESP-944\" errMsg=\"User terminated eKYC process\" resCode=\"FB86FA4C6D694C8392A41793E20C4093\" status=\"0\" ts=\"2024-12-04T12:07:51\" txn=\"UKC:eSign:5959:20241204120608058\"><Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><CanonicalizationMethod Algorithm=\"http://www.w3.org/TR/2001/REC-xml-c14n-20010315\"/><SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><Reference URI=\"\"><Transforms><Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><DigestValue>LdKGvnFx+AbnN44V7IBYwT5Lk86oaDWdJGp8b7gO3jk=</DigestValue></Reference></SignedInfo><SignatureValue>...</SignatureValue><KeyInfo><KeyValue>...</KeyValue></KeyInfo></Signature></EsignResp>'/> <input type='submit' value='submit'></form>",
    "msg": "",
    "otpTxn": ""
}

```  
# 10. Cancel Transaction API

| **Field**       | **Details**                                                                                                                                                                                                                                                |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API Name**     | Cancel Transaction                                                                                                                                                                                                                                         |
| **Method**       | POST                                                                                                                                                                                                                                                      |
| **Endpoint**     | `/nsdl-esp/authenticate/esignCancelRedirect?kid=1733293670041241794&cr=otp`                                                                                                                                                                                |
| **Query String** | `kid=1733293670041241794&cr=otp`                                                                                                                                                                                                                          |

## Response

```json
{
    "status": "OK",
    "frm": "<form action='http://172.18.2.91:8084/ESPTestCall/NSDLEsignTestAction?f=tRgz3NogX9LD60hZqe6lPdBZuzP5DC30Ze86CK71N3oaH95OL0oxmAjMPmTFqa_PU-lEYIt_m4thb1vT99ewYIPR4WzRu-ZHPWPcZzlaev6RiBa64b0365hL7O8Ix5bAw5ipK6wtMxAunS12ksvPoEcPGBZAJqZAfR1OdOd5kD4yn8XffYG0y1MrAtKuqoDESVfAoUyLb-7wolJjWyV42TSYuhDdfbU-fuuhsHW8-B8Wyci8yBl0I0PDv8I74Tot4W97WtetaRoXqNqfbdqOG7DuKZiikK0BfBAe1R0tzeJhT-19CKLcoKZfIMCeDpkjtFhlOtf8BdZnS5K8I8V8g8eRaN0juyXrHWlG1BofnXPke8S_6C3qytduJevfoGtn4aot018KeYN6hWgD9d-np2xvtMVQHUvOaYF_cOoqlwnQgWdLdfZmlQcKpt5Z-E54' id='esid' method='post' enctype='multipart/form-data'> <input type='hidden' id='msg' name = 'msg' value='<?xml version=\"1.0\" encoding=\"UTF-8\"?><EsignResp errCode=\"ESP-944\" errMsg=\"User terminated eKYC process\" resCode=\"FB86FA4C6D694C8392A41793E20C4093\" status=\"0\" ts=\"2024-12-04T12:07:51\" txn=\"UKC:eSign:5959:20241204120608058\"><Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><CanonicalizationMethod Algorithm=\"http://www.w3.org/TR/2001/REC-xml-c14n-20010315\"/><SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><Reference URI=\"\"><Transforms><Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><DigestValue>LdKGvnFx+AbnN44V7IBYwT5Lk86oaDWdJGp8b7gO3jk=</DigestValue></Reference></SignedInfo><SignatureValue>...</SignatureValue><KeyInfo><KeyValue>...</KeyValue></KeyInfo></Signature></EsignResp>'/> <input type='submit' value='submit'></form>",
    "msg": "",
    "otpTxn": ""
}
