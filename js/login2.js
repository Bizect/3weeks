function session_del(){ //세션 삭제
    if(sessionStorage){
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass"); // 이 줄을 추가
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function logout(){
    session_del(); // 세션 삭제
    setTimeout(function() {
        location.href='../index.html';
    }, 1000); // 0.5초 지연
}

function init(){
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id){
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_set(){//세션 저장
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX");
    if(sessionStorage){
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else{
        alert("로컬 스토리지 지원 x");
    }
}

function session_get(){
    if(sessionStorage){
        return sessionStorage.getItem("Session_Storage_pass");
    }else{
        alert("세션 스토리지 지원 x")
    }
}

function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('세션 스토리지를 삭제했습니다.');
    } else {
        alert("세션 스토리지를 지원하지 않는 브라우저입니다.");
    }
}

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key),{
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

function encrypt_text(password){
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
}

function decrypt_text(encryptedText) {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = decodeByAES256(rk, encryptedText);
    if (b) {
        console.log(b);
    } else {
        console.error('복호화 실패');
    }
}

function checkSession() {
    if (window.sessionStorage) {
        const sessionId = sessionStorage.getItem("Session_Storage_id");
        const sessionPass = sessionStorage.getItem("Session_Storage_pass");

        if (sessionId && sessionPass) {
            // 세션 데이터가 있으면 수행할 동작 (예: 사용자 정보 표시)
            console.log("세션 ID:", sessionId);
            console.log("세션 비밀번호:", decrypt_text(sessionPass));
        } else {
            console.log("세션 데이터가 없습니다.");
        }
    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function init_logined() {
    if (sessionStorage.getItem("Session_Storage_id")) {
        // 세션이 존재하면 복호화 시도
        decrypt_text(sessionStorage.getItem("Session_Storage_pass"));
    } 
}

function logout() {
    session_del(); // 세션 삭제
    setTimeout(function() {
        location.href = '../index.html'; // 메인 페이지로 리다이렉트
    }, 1000); // 1초 지연
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById("logout_bttt");
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
