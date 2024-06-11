const idsave_check = document.getElementById('idSaveCheck'); //아이디 기억

const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;

    // 입력값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);

    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    // Sanitized된 값 반환
    return sanitizedInput;
};

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if(emailValue.length > 10){
        alert('아이디는 10글자 이하로 입력해야합니다.');
        return false;
    }

    if(passwordValue.length > 15){
        alert('비밀번호는 15글자 이하로 입력해야 합니다.');
        return false;
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if(!hasSpecialChar){
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.')
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if(!hasUpperCase || !hasLowerCase){
        alert('패스워드는 대소문자를 1개 이상 포함해야합니다.');
        return false;
    }

    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);

    if(!sanitizedEmail){
        return false;
    }

    if(!sanitizedPassword){
        return false;
    }

    console.log('이메일', emailValue);
    console.log('비밀번호', passwordValue);
    loginForm.submit();

    session_set(emailValue, passwordValue);

    if (idsave_check.checked === true) {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1);
        alert("쿠키 값 : " + emailValue);
    } else {
        setCookie("id", emailValue.value, 0);
    }

    // 로그인 성공 조건
    if (emailValue && passwordValue) {
        login_count(); // 로그인 횟수 증가 및 쿠키 저장
        window.open('popup/pop_up2.html', 'popup', 'width=400,height=300');
    }
};

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=None; Secure`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  
/*function getCookie(name){
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if(cookie != ""){
        var cookie_array = cookie.split(";");
        for(var index in cookie_array){
            var cookie_name = cookie_array[index].split("=");

            if(cookie_name[0] == "id"){
                return cookie_name[1];
            }
        }
    }
    return;
};
*/

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


    function session_set() {
        const sessionId = document.querySelector("#typeEmailX").value;
        const sessionPass = document.querySelector("#typePasswordX").value;
      
        if (window.sessionStorage) {
          const encryptedPass = encrypt_text(sessionPass);
          sessionStorage.setItem("Session_Storage_id", sessionId);
          sessionStorage.setItem("Session_Storage_pass", encryptedPass);
        } else {
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

function session_del(){
    if(sessionStorage){
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');

    }else{
        alert("세션 스토리지 지원 X");
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

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key),{
        iv: CryptoJS.enc.Utf8.parse(""),
        padding : CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);  
}

function encrypt_text(password){
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key";
    const rk = k.padEnd(32, " ");
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

function login_count() {
    let loginCount = getCookie("login_cnt");
    if (!loginCount) {
      loginCount = 0;
    }
    loginCount++;
    setCookie("login_cnt", loginCount, 365);
    alert(`로그인 횟수: ${loginCount}`);
  }
  
  function logout_count() {
    let logoutCount = getCookie("logout_cnt");
    if (!logoutCount) {
      logoutCount = 0;
    }
    logoutCount++;
    setCookie("logout_cnt", logoutCount, 365);
    alert(`로그아웃 횟수: ${logoutCount}`);
  }


document.getElementById("login_btn").addEventListener('click', check_input);
window.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login_btn');
    loginBtn.addEventListener('click', check_input);
});