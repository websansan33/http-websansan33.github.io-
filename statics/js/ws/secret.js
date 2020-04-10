//密钥
//var key = CryptoJS.enc.Utf8.parse('1234567890123456');
//偏移向量
//var IV  = CryptoJS.enc.Utf8.parse("1111111111111111");

function getKey(){
  //重新请求获取key
  var req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null);
  var header = req.getResponseHeader("Random-Key");
  return header;
}

/**
* [encrypt 加密]
* @return {[字符串]} [加密后的base64字符串]
*/
function encrypt(content,key,iv) {
  var encryptResult = CryptoJS.AES.encrypt(content, key, {
      iv: iv,

      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
      //mode: CryptoJS.mode.ECB,
      //padding: CryptoJS.pad.Pkcs7
    });
  return encryptResult.toString();
}
/**
* [decrypt 解密]
* @return {[字符串]} [解密后数据]
*/
function decrypt(content,key,iv) {
  var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
      //mode: CryptoJS.mode.ECB,
      //padding: CryptoJS.pad.Pkcs7
    });
  var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
  return decryptResult.toString().replace(/([\u0000-\u000F]*$)/g,"").trim();
}

function demsg(res){
  //解密 下发json
  var res = JSON.parse(res);
  iv = res.iv;
  //console.log('JS解密前：'+res.msg);
  var key = CryptoJS.enc.Utf8.parse('1234123412341234');
  var ivv = CryptoJS.enc.Utf8.parse(iv);
  return decrypt(res.msg,key,ivv);
}

function enmsg(data){
  //加密
  //var data = "JS DATA 11点18分";
  //console.log('JS加密前：'+data);
  var key = CryptoJS.enc.Utf8.parse('1234123412341234');
  //console.log('向量1：'+iv);
  var ivv = CryptoJS.enc.Utf8.parse(iv);
  //console.log('向量：'+iv);
  var encrypted = encrypt(data,key,ivv);
  data = encrypted.toString();
  //console.log('JS加密后：'+data);
  var msg = {'msg':data,'iv':iv};
  return JSON.stringify(msg);
}
