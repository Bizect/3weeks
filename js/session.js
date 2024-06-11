function session_set() {
    let session_id = document.querySelector("#typeEmailX").value;
    let session_pass = document.querySelector("#typePasswordX").value;
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass);
        sessionStorage.setItem("Session_Storage_id", session_id);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() {
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}


function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        sessionStorage.removeItem("Session_Storage_new_user");
        sessionStorage.removeItem("Session_Storage_new_user_encrypted");
        alert('세션 스토리지를 삭제했습니다.');
    } else {
        alert("세션 스토리지를 지원하지 않는 브라우저입니다.");
    }
}

function session_join_set(signUpObj) {
    if (sessionStorage) {
        const objString = JSON.stringify(signUpObj);
        let en_text = encrypt_text(objString);
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_join_get() {
    if (sessionStorage) {
        let encryptedData = sessionStorage.getItem("Session_Storage_new_user_encrypted");
        console.log("Encrypted Data: ", encryptedData);
        if (encryptedData) {
            let decryptedData = decrypt_text(encryptedData);
            console.log("Decrypted Data: ", decryptedData);
            return JSON.parse(decryptedData);
        }
    } else {
        alert("세션 스토리지 지원 x");
    }
    return null;
}

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

function encrypt_text(text) {
    const key = "key";  // 암호화 키는 32바이트여야 합니다.
    const iv = CryptoJS.lib.WordArray.random(16); // Initialization vector
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key.padEnd(32, ' ')), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

function decrypt_text(encryptedText) {
    const key = "key";  // 암호화 키는 32바이트여야 합니다.
    const encryptedData = CryptoJS.enc.Base64.parse(encryptedText);
    const iv = encryptedData.clone();
    iv.sigBytes = 16;
    iv.clamp();
    encryptedData.words.splice(0, 4); // Remove IV from encrypted data
    encryptedData.sigBytes -= 16;
    
    try {
        const decrypted = CryptoJS.AES.decrypt({
            ciphertext: encryptedData
        }, CryptoJS.enc.Utf8.parse(key.padEnd(32, ' ')), {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption failed: ", error);
        return null;
    }
}
function checkSession() {
    if (sessionStorage) {
        const sessionId = sessionStorage.getItem("Session_Storage_id");
        if (!sessionId) {
            alert("로그인이 필요합니다.");
            location.href = '../index.html'; // 메인 페이지로 리다이렉트
        }
    } else {
        alert("세션 스토리지를 지원하지 않는 브라우저입니다.");
    }
}