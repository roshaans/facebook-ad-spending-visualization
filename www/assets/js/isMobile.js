 function isItMobile() {      
    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    if (isMobile) {
        console.log("Mobile Device Detected.")
        return true
    }else {
        console.log("Not Mobile Device.")
        return false
    }
 }

