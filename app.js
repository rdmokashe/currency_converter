
const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");

for(let i =0; i < dropList.length; i++){
    for(currency_code in country_code){
        // SELECTING USD BY DEFAULT AS FROM CURRENCY AND INR AS TO currrency
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        // craeting option tag with passign cuuurency code as a text and value
        let optionTag =  `<option value ="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change",e =>{
        loadFlag(e.target); // calling loadFlag passing target element as an argument
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){ // if currency code of country is  equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load",()=>{
    getExchangeRate();
});
getButton.addEventListener("click",e=>{
    e.preventDefault(); // preventing form from submitting
    getExchangeRate();
});

const exchangeIcon =document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click",()=>{
let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
fromCurrency.value = toCurrency.value; // passsing To currency code to FROM currency code
toCurrency.value = tempCode; // passing temporary currency code to To currency code
loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
loadFlag(toCurrency); // calling loadFlag with passing select element (to Currency) of TO
getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
      exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any avlue or enter 0 then we'll put 1 value by defalut in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText ="Getting exchange rate...";
   
    let url = `https://v6.exchangerate-api.com/v6/f8cd9097e5d68812329f61df/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=>{ // if user is offline or any other error occured while fetching data then ctch function will run 
        exchangeRateTxt.innerText = "Something went wrong";
    });
};

