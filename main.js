let base = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const selects = document.querySelectorAll("#select");
const ms = document.querySelector("h4")
const btn = document.querySelector(

    "form button"
)

const fromcurr =document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

for (let s of selects) {
   
    for (let code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if (s.name === "from" && code === "USD") {
            newoption.selected = "selected"
        } else if (s.name === "to" && code == "INR") {
            newoption.selected = "selected"
        }
        s.append(newoption);
    }
    s.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}




const updateflag = (element) => {
    let code = element.value;
    let ccode = countryList[code];
    let newsrc = `https://flagsapi.com/${ccode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

    img.src = newsrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" ||  amtVal<1){
        amount.value="1";
        amtVal=1;
    }
    const Url = `${base}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
    let response = await fetch(Url);
    let data = await response.json();
  console.log(data);
  let rate = data[tocurr.value.toLowerCase()];
console.log(rate)
let finamt = amtVal * rate;
ms.innerText=`${amtVal} ${fromcurr.value} to ${finamt} ${tocurr.value} `;
})