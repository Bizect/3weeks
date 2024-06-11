function encodeByAES256(key, data) {
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
  }
  
  function decodeByAES256(key, data) {
    try {
      const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      return cipher.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error('복호화 오류:', err);
      return null;
    }
  }
  
  function encrypt_text(password) {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
  }
  