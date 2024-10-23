const name_input = document.querySelector("#holder");
const Name = document.querySelector("#input_holder");
const card_number_input = document.querySelector("#card_number");
const card_number = document.querySelector("#input_card_number");


const input_mm = document.querySelector("#month");
const mm = document.querySelector("#mm");
const input_yy = document.querySelector("#year");
const YY = document.querySelector("#YY");


const input_cvc = document.querySelector("#cvc");
const cvc = document.querySelector("#input_cvc");


const button = document.querySelector("button");
const error = document.querySelectorAll(".error");



let checker1 = false;
let checker2 = false;
let checker3 = false;
let checker4 = false;


function holder(){
    if(name_input.value.length == 0) {
        checker4 = false;
        Name.innerHTML = "e.g. Jane Appleseed";
        name_input.style.border = "1px solid hsl(0, 100%, 66%)"
    }else {
        checker4 = true;
        name_input.style.border = "1px solid hsl(270, 3%, 87%)"
        Name.innerHTML = name_input.value;
    }
}

name_input.addEventListener("blur", ()=>{
    holder();
})

function cardN(){
    new Promise((resolve, reject)=>{
        if(card_number_input.value.length < 19){
            reject();
        }
        else {
            resolve();
        }
        
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            for(let item of card_number_input.value){
                let result = !isNaN(item)
                if(result){
                    resolve()
                }

                else{
                    reject()
                    return
                }
            }
        })
        
    }).then(()=>{
        checker1 = true;
        error[0].style.visibility = "hidden";
        card_number_input.style.border = "1px solid hsl(270, 3%, 87%)"
        card_number.innerHTML = card_number_input.value;
    }).catch(()=>{
        checker1 = false;
        error[0].style.visibility = "visible";
        card_number_input.style.border = "1px solid hsl(0, 100%, 66%)"
    })
    
}


card_number_input.addEventListener("keydown", e =>{
        let length = card_number_input.value.length;
        if(e.code != "Backspace"){
           switch (length){
            case 4:
                card_number_input.value += " ";
                break;
            case 9:
                card_number_input.value += " ";
                break;
            case 14:
                card_number_input.value += " ";
                length-= 3
                break;
            } 
        }
        if(e.code == "Space"){
            e.preventDefault()
        }
    })













function EXP(item) {
    new Promise((resolve, reject)=>{
        if(item.value.length == 2){
            resolve();
        }
        else {
            reject();
        }
        
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            for(let element of item.value){
                let result = isNaN(element)
                if(result){
                    reject()
                    return
                }

                else{
                    resolve()
                }
            }
        })
        
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            if(item.id == "year"){
                if(item.value > 0 && item.value < 100){
                    resolve()
                }else{reject()}
            }
            else if (item.id == "month") {
                if(item.value > 0 && item.value <= 12){
                    resolve()
                }else{reject()}
            }
        })
    })
    .then(()=>{
        checker2 = true;
        error[1].style.visibility = "hidden";
        item.style.border = "1px solid hsl(270, 3%, 87%)"
        if(item.id == "year"){
            YY.innerHTML = item.value;
        }
        else if (item.id == "month") {
            mm.innerHTML = item.value;
        }
    }).catch(()=>{
        checker2 = false;
        error[1].style.visibility = "visible";
        item.style.border = "1px solid hsl(0, 100%, 66%)"
    })
}


input_yy.addEventListener("blur" , e =>{
    EXP(input_yy);
})


input_mm.addEventListener("blur" , e =>{
    EXP(input_mm);
}) 

function EXPi(){
    EXP(input_mm);
    EXP(input_yy);
}









input_cvc.addEventListener("blur", e =>{
    CVC();
})




function CVC(){
    new Promise((resolve, reject)=>{
        if(input_cvc.value.length == 3){
            resolve();
        }
        else {
            reject();
        }
        
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            for(let element of input_cvc.value){
                let result = isNaN(element)
                if(result){
                    reject()
                    return
                }

                else{
                    resolve()
                }
            }
        })
        
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
        if(input_cvc.value > 0){
                resolve()
        }else {reject()}
        })
    })
    .then(()=>{
        checker3 = true;
        error[2].style.visibility = "hidden";
        input_cvc.style.border = "1px solid hsl(270, 3%, 87%)"
    }).catch(()=>{
        checker3 = false;
        error[2].style.visibility = "visible";
        input_cvc.style.border = "1px solid hsl(0, 100%, 66%)"
    })
};

card_number_input.addEventListener("blur", e =>{
    cardN();
    
})



button.addEventListener("click", (e)=>{
    CVC();
    EXPi();
    cardN();
    holder();
    if(checker1 && checker2 && checker3 && checker4){
        document.querySelector(".content").removeChild(document.querySelector(".content").firstElementChild)
        document.querySelector(".content").classList.add("confirm_state");


        const confirm_img = document.createElement("img");
        confirm_img.src = "./img/icon-complete.svg";
        confirm_img.style.margin = "20px 0px";

        const h2 = document.createElement("h2");
        h2.textContent = "THANK YOU!";
        h2.style.margin = "30px 0px";
        h2.style.letterSpacing = "3px";

        const p = document.createElement("p");
        p.textContent = "We've added your card details";
        p.style.margin = "30px 0px";
        p.style.color = "gray";

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = "Continue";

        document.querySelector(".content").appendChild(confirm_img)
        document.querySelector(".content").appendChild(h2)
        document.querySelector(".content").appendChild(p)
        document.querySelector(".content").appendChild(btn)
    }

    else{
        e.preventDefault()
    }

})