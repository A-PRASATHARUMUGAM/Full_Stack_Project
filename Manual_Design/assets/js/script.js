
document.addEventListener("DOMContentLoaded",()=>{
    
        // ---- Authentication Script  ----

// Password Eye Open and Close 
const passwordInput= document.getElementById("password");
const eyetogglebtn=document.getElementById("togglePassword");
const eyeOpen= document.getElementById("eyeOpen");
const eyeClosed= document.getElementById("eyeClosed");

eyetogglebtn.addEventListener("click",()=>{
    if(passwordInput.type === "password"){
        passwordInput.type="text";
        eyeOpen.classList.remove("hidden");
        eyeClosed.classList.add("hidden");
    }else{
        passwordInput.type="password";
        eyeOpen.classList.add("hidden");
        eyeClosed.classList.remove("hidden");
    }
});


});

// Select visited or not visited handling   
function updateBg(select) {
    if (select.value === "visited") {
    select.classList.remove("bg-red-500");
    select.classList.add("bg-[#009699]");
    } else {
    select.classList.remove("bg-[#009699]");
    select.classList.add("bg-red-500"); 
    }
}



  