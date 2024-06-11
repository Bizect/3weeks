function googleSearch(){
    const searchTerm = document.getElementById("search_button_msg").value;
    const googleSearchUrl = 'https://www.google.com/search?q=${encodeURIComponent(searchTerm)}';
    //새창에서 구글검색을 수행
    window.open(googleSearchUrl, "_blank");//새로운 창에서 열기
    return false;

}


