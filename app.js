const form = document.querySelector("#valueForm");
const calculateType = document.querySelector("#includeKDV").value;
const reset = document.querySelector("#reset");

//reset-button
reset.addEventListener("click", ()=>{
    const result = document.querySelector(".result");
    result.innerHTML = '';
    
});

//radio-button includeKDV or NotIncludKDV
var currentValue = 0;
function handleClick(calculateType) {
    currentValue = calculateType.value;
    
}
//Calculating
form.addEventListener("submit", formSubmit);
function formSubmit(e){
    e.preventDefault();
    let amount = document.querySelector("#currency-field").value;

    let percent = document.querySelector("#percent").value;
    
    const result = document.querySelector(".result");

    if(currentValue === "1"){

        const amountResult = document.createElement("p");
        amountResult.classList.add("amount");
        amountResult.innerHTML = "Toplam Tutar: "+ " "+ formatter.format(amount);
        result.appendChild(amountResult);
        
        const percentResult = document.createElement("p");
        percentResult.classList.add("percent");
        percentResult.innerHTML = "Yüzde Tutar: " + " "+ formatter.format((amount*percent)/100);
        result.appendChild(percentResult);
        
        let yüzde = Number(amount) + Number((amount*percent)/100);
        const totalAmount = document.createElement("p");
        totalAmount.classList.add("total");
        totalAmount.innerHTML = "KDV dahil Tutar: " + formatter.format(yüzde);
        result.appendChild(totalAmount);
        const line = document.createElement("hr");
        result.appendChild(line);
    }else{
        const kdvIncludeAmount = document.createElement("p");
        kdvIncludeAmount.classList.add("kdvAmount");
        kdvIncludeAmount.innerHTML += "KDV dahil tutar: "+ " "+formatter.format(amount);
        result.append(kdvIncludeAmount);

        let kdvIncludeTotal = parseFloat(Number(amount)/ Number(1+percent/100)).toFixed(2);
        const kdvPercent = document.createElement("p");
        kdvPercent.classList.add("kdvPercent");
        kdvPercent.innerHTML += "KDV Tutarı: "+ " "+ formatter.format(parseFloat(amount-kdvIncludeTotal)).toString(2);
        result.append(kdvPercent);

        
        const kdvTotal = document.createElement("p");
        kdvTotal.classList.add("kdvTotal");
        kdvTotal.innerHTML += "KDV hariç Tutar: " + " "+ formatter.format(kdvIncludeTotal).toString(2);
        result.append(kdvTotal);
        const line = document.createElement("hr");
        result.appendChild(line);
    }   
}
//currency formating you can change currency like en-US. 
const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  
    // after the point given two digit
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
});