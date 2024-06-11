var jb = 'hi'; //변수 선언 후 주석가능(한줄)
var a = 1;
var b;
b = 5;
if(true){
 let c = 'let 접근';
 var c_1 = 'var 접근';
}
//console.log(c); //error?
console.log(c_1);

let d = 5;
console.log(d);

const e = '상수1 접근';
//e = 5;
//const f // Error?
console.log(e);

    const search_message = () => {
        const c = '검색을 수행합니다';
        alert(c);
    }

//document.getElementById("search_btn").addEventListener('click', search_message);

/*const over = (obj) => {
    obj.src = "image/LOGO.png";
        
    }; 
    */
    

/*function search_message(){
    alert("검색을 수행합니다!");
}
*/
