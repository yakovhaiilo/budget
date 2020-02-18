
let incomeVal = 0, expenceVal = 0, balanceVal = 0;
let balanceElement = document.getElementById("show-balance");
let incomeElement = document.getElementById("show-income");
let expenceElement = document.getElementById("show-expence");
let percentageElement = document.getElementById("percentage");
let selectElement = document.getElementById("select");
let descriptionElement = document.getElementById("text");
let amountElement = document.getElementById("number");
let erorMessage = document.getElementById("message");

// create element for income or revnue

function createElement(url, element) {
    let p = document.createElement("p");
    let pIncome = document.getElementById("create-income");
    let pExpence = document.getElementById("create-expence");
    let elementDescription = document.createElement("span");
    let elementAmount = document.createElement("span");
    let footerElementPercentage = document.createElement("span");
    let elementIcon = document.createElement("span");
    p.classList.add("creatElemntIncome");

    if (url == "Incomes") 
    {
        elementDescription.textContent = element.description;
        elementAmount.textContent = element.amount;
        elementIcon.innerHTML = `<i class="far fa-times-circle"></i>`
        elementIcon.classList.add("elementIconincome");
        elementAmount.classList.add("elementAmountincome");
        elementDescription.classList.add("elementDescriptionincome");
        p.append(elementDescription, elementAmount, elementIcon);
        pIncome.append(p);
        incomeVal += Number(elementAmount.textContent);
        incomeElement.textContent = `+${incomeVal.toFixed(2)}`;
        balanceVal += Number(elementAmount.textContent);
        balanceElement.textContent = balanceVal;
        percentageSpendList();
        setTopPercentage();
        elementIcon.addEventListener("click", function () {deleteIncome(url, element.id, this)});
    }
    else if (url == "Expenses") 
    {
        elementDescription.textContent = element.description;
        elementAmount.textContent = element.amount;
        footerElementPercentage.innerHTML = `0%`
        elementIcon.innerHTML = `<i class="far fa-times-circle"></i>`
        elementDescription.classList.add("elementDescriptionExpence");
        footerElementPercentage.classList.add("footerElementPercentage");
        elementIcon.classList.add("elementIconExpence");
        elementAmount.classList.add("elementAmountexpence");
        p.append(elementDescription, elementAmount, footerElementPercentage, elementIcon)
        pExpence.append(p);
        expenceVal += Number(elementAmount.textContent);
        expenceElement.textContent = `-${expenceVal.toFixed(2)}`;
        balanceVal -= Number(elementAmount.textContent);
        balanceElement.textContent = balanceVal;
        setTopPercentage()
        percentageSpendList();
        elementIcon.addEventListener("click", function () { deleteIncome(url, element.id, this ) });
    }

}

//  delete opertion
function deleteIncome(url, id, thisObj)
 {
    axios.delete(`/${url}/${id}`)
        .then(function (response)
         {   
            if (response.status == 200) {
                let pParnt = thisObj.parentNode;
                let description = pParnt.children[0].textContent
                if (url == "Incomes")
                 {
                    incomeVal -= Number(pParnt.children[1].textContent);
                    incomeElement.textContent = `+${incomeVal.toFixed(2)}`;
                    balanceVal -= Number(pParnt.children[1].textContent);
                    balanceElement.textContent = balanceVal;
                    pParnt.remove(thisObj);
                    setTopPercentage()
                    percentageSpendList();
                    updateHistory("delete","Incomes",description)
                }
                else if (url == "Expenses")
                 {
                    expenceVal -= Number(pParnt.children[1].textContent);
                    expenceElement.textContent = `-${expenceVal.toFixed(2)}`;
                    balanceVal += Number(pParnt.children[1].textContent);
                    balanceElement.textContent = balanceVal;
                    pParnt.remove(thisObj);
                    setTopPercentage();
                    percentageSpendList();
                    updateHistory("delete","Expenses",description)
                }
            }

        })
        .catch(function (error)
         {
            console.log(error);
            closeErrorMessage();
            bounceErrorMessage();
        })
}

// get opertion income Expense

function showAll(url)
 {
    axios.get("/" + url)
        .then(function (response) {

            if (response.status == 200)
            {
                response.data.forEach(element => 
                { 
                    createElement(url, element);   
                });   
            };
        })

        .catch(function (error)
        {
            console.log(error);
            closeErrorMessage();
            bounceErrorMessage();
        })
};
showAll("Incomes");
showAll("Expenses");
// post opertion income /Expenses
function addItem()
 {
    const url = selectElement.value;
    const description = descriptionElement.value;
    const amount = Number(amountElement.value);

    if (description != "" && amount > 0 && isNaN(description))
     {
        descriptionElement.value = "";
        amountElement.value = "";

        axios.post('/' + url, {
            description: description,
            amount: amount
           
        })
            .then(function (response)
            { 
                createElement(url, response.data);
                updateHistory("post",url,description)
            })
       
            .catch(function (error)
            {
                console.log(error);
                closeErrorMessage();
                bounceErrorMessage();
            });
    }else{
        closeErrorMessage();
        bounceErrorMessage();
    }
}
//  percentage revnue list 
function percentageSpendList()
 {
    let expenceChild = document.querySelectorAll('#create-expence p');
    for (let i = 0; i < expenceChild.length; i++)
     {
        let spanValue = Number(expenceChild[i].children[1].textContent) // chenge this 
        let presnge = (spanValue / incomeVal) * 100;  // chenge this
        expenceChild[i].children[2].innerText = `${presnge.toFixed(1)} `
        if (presnge == Infinity  || presnge == NaN)
        {
            expenceChild[i].children[2].innerText = `0%`
        }
        else 
        {
            presnge = (spanValue / incomeVal) * 100
            presnge = expenceChild[i].children[2].innerText = `${presnge.toFixed(1)}%`
        }
    }
}
//  Overall percentages of expenses out of revenue
function setTopPercentage()
{
    let  percentage = 0 ;
    percentage = Math.floor((expenceVal / incomeVal) * 100)
    if (percentage == Infinity|| isNaN(percentage)) {
        percentageElement.textContent =`0%`
    }else{
      let presnge = (expenceVal / incomeVal) * 100
      percentageElement.textContent = `${presnge.toFixed(1)}%`
    }
 }
// key up event 
amountElement.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("icon").click();
    }
});
//  focus on input
amountElement.addEventListener("focus", function (e) { onFocus(e) });
descriptionElement.addEventListener("focus", function (e) { onFocus(e) });
amountElement.addEventListener("focusout", function (e) { onFocus(e) });
descriptionElement.addEventListener("focusout", function (e) { onFocus(e) });
function onFocus(e) {
    if (e.type == "focus") {
        if (selectElement.value == "Incomes") {
            e.target.style.border = "2px solid rgb(57, 177, 174)";
        }  else {
            e.target.style.border = "2px solid rgb(249, 61, 66)";
        }
    } 
     else if (e.type == "focusout")  {
        e.target.style.border = "";
    }
}; 
// create dinamic date
function getDate() {
    let date = new Date();
    let getElemntDate = document.getElementById("date");
    let array = ["Januray", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let M = array[date.getMonth()];
    let Y = date.getFullYear();
    getElemntDate.innerHTML = `available budget in ${M} ${Y}`;
}
getDate();
//  Click to close the error message
function closeErrorMessage(){
erorMessage.style.display = "none";
}
// Bounce error message
function bounceErrorMessage(){
erorMessage.style.display = "block";
erorMessage.style.opacity = 0.9;
}

//  History page actions

function updateHistory(operation,type,description){
    let curnetDate = historyDate();
    axios.post('/history' , {
        operation: operation,
        date :curnetDate,
        type :type,
        description : description
    })
        .then(function (response)
        {
            if(response.status == 201){
                console.log(response);
            }
   
        })
        .catch(function (error)
        {
            console.log(error);
        
        });
} 

//  history date and time of each action 
function historyDate(){
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} ${mm}/${dd}/${yyyy}`
return today;
}
