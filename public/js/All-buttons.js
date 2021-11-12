//$(".hamburger").on("click", function (){
//    $(".main-navigation").toggleClass(".main-navigation--small");
//
//});

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.main-navigation')
hamburger.addEventListener("click", function (){
    nav.classList.toggle('main-navigation--small');
    console.log('testujemy');
})
