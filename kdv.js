var buttons = document.getElementsByClassName("myButton");
var kdv_orani;

// 1-8-18 Vat rate
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var buttonValue = this.value;
        kdv_orani = Number(buttonValue);
        console.log(typeof (kdv_orani));
    });
}

function hesapla() {

    var input = Number(document.querySelector("#inputValue").value);
    var fiyat = Number(document.getElementById("fiyat").value);

    if(!fiyat){
        setTimeout(() => {
            require.style.display='none';
            priceElement.style.border = "";
        }, 1500);
        const btngroup = document.querySelector(".btn-toolbar");
        const require = document.createElement("p");
        require.classList.add("alert");
        require.style.color = "red";
        require.innerHTML="gerekli alanı doldurulmalıdır";
        btngroup.appendChild(require);
        const priceElement = document.querySelector("#fiyat");
        priceElement.style.border = "2px solid red";
        
    }
    
    console.log(kdv_orani);
    if (input) {

        kdv_orani = Number(input);
        if(kdv_orani<0 || kdv_orani>100){
            setTimeout(() => {
                require.style.display='none';
            }, 1500);
            const btngroup = document.querySelector(".btn-group");
            const require = document.createElement("p");
            require.classList.add("alert");
            require.style.color = "red";
            require.innerHTML="KDV oranı 0-100 arasında olmalıdır";
            btngroup.appendChild(require);
            
        }
        kdv_orani = Number(input) / 100; //user gives 4 but we'll use in formul 0.04
        document.querySelector("#inputValue").value = null;
    }

    var tutar_secimi = document.querySelector('input[name="tutar_secimi"]:checked').value;

    if (tutar_secimi == 1) {
        // KDV Dahil Tutar Verilmiş, KDV Hariç Tutar Hesapla
        var kdv_haric_tutar = fiyat / Number(1 + kdv_orani);
        var kdv_tutari = fiyat - kdv_haric_tutar;
        var sonuc = " Toplam Tutar: " + fiyat + "₺ <br>KDV Tutarı: " + kdv_tutari.toFixed(2) +
            "₺<br><hr> KDV Hariç Tutar: " + kdv_haric_tutar.toFixed(2) + "₺";
    } else {
        // KDV Hariç Tutar Verilmiş, KDV Dahil Tutar Hesapla
        var kdv_tutari = fiyat * Number(kdv_orani);
        var kdv_dahil_tutar = fiyat + kdv_tutari;
        var sonuc = "Toplam Tutar: " + fiyat + " ₺ <br>KDV Tutarı: " + kdv_tutari
            .toFixed(2) + "₺<br><hr>KDV Dahil Tutar: " + kdv_dahil_tutar.toFixed(2)+ "₺";
    }

    document.getElementById("sonuc").innerHTML = sonuc;
}