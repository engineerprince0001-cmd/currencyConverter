


const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";





const countryList = {
    America: {
        code: "US",
        currency: "usd"
    },
    India: {
        code: "IN",
        currency: "inr"
    },


    Japan: {
        code: "JP",
        currency: "jpy"
    },
    Australia: {
        code: "AU",
        currency: "aud"
    },
    Canada: {
        code: "CA",
        currency: "cad"
    },
    China: {
        code: "CN",
        currency: "cny"
    }
};
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

console.log(dropDowns);

for (let select of dropDowns) {
    for (let currCode in countryList) {

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;



        select.append(newOption);




        if (select.name === "from" && currCode === "India") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "America") {
            newOption.selected = "selected";
        }



    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);

    let countryCode = countryList[currCode].code;

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();



    let amtValue = document.querySelector(".amount input");

    console.log(amtValue);
    let amount = amtValue.value;
    console.log(amount);

    if (amount === "" || amount < 1) {
        amount = 1;
        amtValue.value = "1";
    }


    const URL = `${BASE_URL}/${countryList[fromCurr.value].currency}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[countryList[fromCurr.value].currency]
    [countryList[toCurr.value].currency];

    let finalAmount = amount * rate;
    message.innerText = `${amount} ${fromCurr.value+"n"} = ${finalAmount} ${toCurr.value+"n"}`;
    message.classList.add("show-message");
})


