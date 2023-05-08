import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
import JSEncrypt from 'jsencrypt'
// 16位密钥
export const KEY_IV = {
  //key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgIQZtO4ytzTD9+mgbBbtANTcErn1hoOLDyphgtHtvyF+nhUKR81fHk6fI1HopjlczCkJFuNaUpgp4tYpNK+FVNfyjy6BUz+9cLjFR1t4Dh/r2q5o/E5lcVUi5c6P/B1YeowIg9oavyrqwbitEhCGyv/AD2gl+uyNykNoaG/GKBQIDAQAB',
 // iv: '@11111000001111_',
}

// AES加密和解密
export class AesEncryption {
  constructor(opt = KEY_IV) {
    const { key, iv } = opt
    if (key) {
      this.key = parse(key)
    }
    if (iv) {
      this.iv = parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    }
  }

  encryptByAES(cipherText) {
    return encrypt(cipherText, this.key, this.getOptions).toString()
  }

  decryptByAES(cipherText) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

// Base64加密
export function encryptByBase64(cipherText) {
  return Base64.stringify(UTF8.parse(cipherText))
}

// Base64解密
export function decryptByBase64(cipherText) {
  return Base64.parse(cipherText).toString(UTF8)
}

// MD5加密，不可逆
export function encryptByMd5(password) {
  return md5(password).toString()
}




//默认密钥
const encKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOAhBm07jK3NMP36aBsFu0A1NwSufWGg4sPKmGC0e2/IX6eFQpHzV8eTp8jUeimOVzMKQkW41pSmCni1ik0r4VU1/KPLoFTP71wuMVHW3gOH+varmj8TmVxVSLlzo/8HVh6jAiD2hq/KurBuK0SEIbK/8APaCX67I3KQ2hob8YoFAgMBAAECgYA/+c1O0se2OLL6XEbpJ7qqekYpJPGPM5BnGOZj/ECbyNNdCxHUfWSaCFDFZ7kzMXk8jXobUsaVicvFZvSCULsxwcSWoQGdL6Fp0StbP1tmm3XYzdtUW9LHL22oD3GeNjUQa3jNWqQUX1bnsfwcSp84BSlL2hckF6DgLnWObyhrJQJBAPIhrGvPb9AVZO3gD5mdMOGn6BQ/pYWwZQtfDDvlbTBATXWoZchS5AL7aLjLharJXlCzePUbhi8cfPx50YJAL0sCQQDs92JP7LoDKyoxA/m21ULvSP6/lcwFf7d5XCEAtXlcUNuqfoSgi79czB2rqReAlDgTF8yFV4hEXFrCgsjC+0nvAkEApdLf9bnL9rMgOzUPGgIoXvKSI4PvRR6oJOCETWTzoW74XZLlmgsCsvQhJSXlNjDQke5H8X1XKV6WTobTMCPq/wJAY+ZjNwi43s8ayXFAnFjKEDD43PIdAhB23B3/99mJ4WZhRT5zUW+47DlNJOpzcwyJm1sEKQ7e7tr0lF4onzLrVwJAGoBTMgSx2wmXtuJq4jAcN0QvqE3lJEduvGQO/MvdoxU2rzjZO+t483AKirI+TS2BtlV/mifh1we3S173+zs/5w==';

/**
 * 加密,带密钥（需要先加载lib/aes/aes.min.js文件）
 * @param word
 * @param key
 * @returns {*}
 */
export function encryptWithKey(word,key){
  var key = CryptoJS.enc.Utf8.parse(key);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}

export function encryptNoKey(word){
  var jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(encKey);
  return jsEncrypt.encrypt(word);
  // return encryptWithKey(word, encKey);
}

/**
* 解密
* @param word
* @param key
* @returns {*}
*/
export function decryptWithKey(word, key){
  var key = CryptoJS.enc.Utf8.parse(key);
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
