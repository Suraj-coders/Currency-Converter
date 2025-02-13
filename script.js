let apiKey ="eed73b1c50002a5c79288957";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === 'to' && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    window.addEventListener("load", () => {
      updateExchangeRate();
    });

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    
    fetch(api)
    .then((resp) => resp.json())
    .then((data) => {
      let fromExchangeRate = data.conversion_rates[fromCurr.value];
     
      
      let toExchangeRate = data.conversion_rates[toCurr.value];
     
      
    let finalAmount = (amtVal / fromExchangeRate) * toExchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  });
};
const updateFlag = (element) => {
   
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
