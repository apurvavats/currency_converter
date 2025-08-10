const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_bWaP5uNBUo3UFANOJdFgjHhoGBAyV0fS1nBVsYte";
const dropdown = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdown){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerHTML=currCode
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
           newOption.selected="selected"; }
        if(select.name === "to" && currCode === "INR"){
           newOption.selected="selected"; }
        select.append(newOption);
    
       
        }
         select.addEventListener("change", (evt) => {
            updateflag(evt.target);
    });
}

        const updateflag=(element)=>{
            let currCode=element.value;
            let countryCode=countryList[currCode];
            // console.log(countryCode);
            let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
            let img= element.parentElement.querySelector("img");
            img.src=newSrc;

            

        }
        
        btn.addEventListener("click", async (evt) => {
            evt.preventDefault();
           let amount= document.querySelector(".amount input");
           let amtVal = amount.value;
           if(amtVal === "" || amtVal <= 0 ){
            alert("Please enter a valid amount");
            return;
           }
           console.log(fromCurr.value);
           console.log(toCurr.value);
        const URL=`${BASE_URL}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        let rate= data.data[toCurr.value].value;
        console.log(rate);
        let finalAmount = (amtVal * rate);
        msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        })
