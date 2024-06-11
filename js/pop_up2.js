let logoutTimer;
const MAX_TIME = 300; // 최대 시간 5분 (300초)
let remainingTime = MAX_TIME;

document.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    startLogoutTimer();

    document.getElementById('logout-button').addEventListener('click', () => {
        sessionDel();
        window.close();
        window.opener.location.href = '../index.html'; // 메인 페이지로 리다이렉트
    });

    document.getElementById('extend-session-button').addEventListener('click', () => {
        remainingTime = MAX_TIME; // 남은 시간을 최대 시간으로 재설정
        updateTimerDisplay();
    });
});

function startLogoutTimer() {
    logoutTimer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        if (remainingTime <= 0) {
            clearInterval(logoutTimer);
            sessionDel();
            window.close();
            window.opener.location.href = '../index.html'; // 메인 페이지로 리다이렉트
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    document.getElementById('logout-timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function sessionDel() {
    if (window.sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('세션이 삭제되었습니다.');
    } else {
        alert("세션 스토리지가 지원되지 않습니다.");
    }
}