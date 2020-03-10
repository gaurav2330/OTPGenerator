const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const func={
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
	const hasLower = lowercaseEl.checked;
	const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.innerText=generateOTP(length, hasUpper, hasLower, hasNumber, hasSymbol);
});

clipboardEl.addEventListener('click', () => {
    const textarea= document.createElement('textarea');
    const otp= resultEl.innerText;

    textarea.value=otp;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('OTP copied to clipboard!');
})

function generateOTP(length, upper, lower, number, symbol){
    let generatedOTP='';
    const typescount=upper + lower + number + symbol;
    
    const typesarr=[{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0] 
    );
    // console.log(typesarr);

    if(typescount===0){
        return '';
    }

    if(length>20){
        alert ('Length must be less than or equal to 20');
        return '';
    }

    for(let i=0;i<length;i+=typescount){
        typesarr.forEach(type =>{
            const funcName= Object.keys(type)[0];

            generatedOTP+= func[funcName]();
        })
    }

    const finalOTP= generatedOTP.slice(0,length);

    return finalOTP;

}

function getRandomLower(){
    return String.fromCharCode((Math.floor(Math.random()*26)+97));
}

function getRandomUpper(){
    return String.fromCharCode((Math.floor(Math.random()*26)+65));
}

function getRandomNumber(){
    return String.fromCharCode((Math.floor(Math.random()*10)+48));
}

function getRandomSymbol(){
    return String.fromCharCode((Math.floor(Math.random()*15)+33));
}
