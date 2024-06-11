console.log('join.js 파일이 로드되었습니다.');

class SignUp {
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdayDate = birthdayDate;
        this.gender = gender;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.classNumber = classNumber;
        this.random = random;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get contactInfo() {
        return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
    }

    set contactInfo(contactInfo) {
        const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.random = random;
    }
}

function join() {
    console.log('join 함수가 호출되었습니다.');  // 디버깅을 위한 콘솔 로그
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName")?.value || null;
    let l_name = document.querySelector("#lastName")?.value || null;
    let b_day = document.querySelector("#birthdayDate")?.value || null;
    let gender = document.querySelector('input[name="gender"]:checked')?.value || null;
    let email = document.querySelector("#emailAddress")?.value || null;
    let p_number = document.querySelector("#phoneNumber")?.value || null;
    let class_check = document.querySelector("#classNumber")?.value || null;
    let random = new Date();

    console.log({ f_name, l_name, b_day, gender, email, p_number, class_check });  // 디버깅용 로그

    if (!f_name || !l_name || !b_day || !email || !p_number) {
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별 분반 제외)");
    } else {
        const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
        console.log(newSignUp.fullName);
        console.log(newSignUp.contactInfo);

        session_join_set(newSignUp);

        window.location.href = "../join/join_end.html";
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

function encrypt_text(text) {
    const key = "key"; // 암호화 키
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decrypt_text(encryptedText) {
    const key = "key"; // 암호화 키
    const cipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}
