
document.querySelector('#ewallet-form').addEventListener('submit',function(e){
    e.preventDefault();
   //taking a data from input field by quary selector and value property
    const type = document.querySelector('.add__type').value;
    const desc=document.querySelector('.add__description').value;
    const value=document.querySelector('.add__value').value;
    if (desc&&value) {                                       //if user input value then ittems will be add
        addItems( type,desc,value);                          //calling addItems() to add Items that user inputed by sendin user inputed data [type,desc,value]
        resetForm();                                         //calling resetForm() to reset input field by clearing input data
    }
    showTotalIncome();
    showTotalExpensess();
    showTotlaBalance();
});

//adding user input data into new html element
function addItems(type,desc,value){
  const time = getFormattedTime() //it return current time formate
    //ceate html element block 
    const newHtmlElementBlock = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${type==='+'? "income-amount":"expense-amount"}">
      <p> ${type}$ ${value}</p>
    </div>
  </div>
  </div>
`;
  //add newHtmlblock element into collection div by using insertAdjacentHTML()
  const collection=document.querySelector('.collection');
  collection.insertAdjacentHTML('afterbegin',newHtmlElementBlock);  //here afterbein proper use to to isert starting of element in selected (innere)
  //calling addItemsToLS() to store user inputed desc, time type data into Local Storage 
  addItemsToLS(desc,time,type,value);
}

//using curren date and time by Date() constructor function
function getFormattedTime() {
  const dateTime = new Date().toLocaleTimeString('en-us', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const date=dateTime.split(',')[0].split(' ');
  const time = dateTime.split(',')[1];
  return `${date[1]} ${date[0]},${time}`;
}

//creating resetForm() to reset input form by selecting input element type and setting value as empty string
function resetForm(){
    document.querySelector('.add__type').value='+';
    document.querySelector('.add__description').value='';
    document.querySelector('.add__value').value='';
}


// Store user inputed data into local storage as joson format as key value pair and rendar it from local storage
//store data when user submited form into items key in localstorage

function addItemsToLS(desc,time,type,value){
    //first get items key from localstorage and check if any value on items key 
    
    let items=getItemsFromLS();
    items.push({desc,time,type,value});//adding data into items array

    //store into local storage by converting JSON form
    localStorage.setItem('items',JSON.stringify(items));
}

// creating function  to get JSON data from local Storage
function getItemsFromLS(){
  let items=localStorage.getItem('items');
  if(items){
    items=JSON.parse(items); //converting JSONE to string object array
  }else{ items=[];}//creating empty array
  return items;
}

//Show Local storage Data into html page in collections div
showItems();
function showItems(){
  const collection=document.querySelector('.collection');
  let items=getItemsFromLS();
  for (const item of items) {
    const newHtmlElementBlock = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${item.type==='+'? "income-amount":"expense-amount"}">
      <p> ${item.type}$ ${item.value}</p>
    </div>
  </div>
  </div>
  `;
  collection.insertAdjacentHTML('afterbegin',newHtmlElementBlock); 
  }
}


//show total income and expenses

showTotalIncome();
function showTotalIncome(){
  //get local storage date
  let items =getItemsFromLS();
  //all type:+ need to add for total income, and type:- add for total expense ,
  //then subtraction from total income to total expenses will be  total balance

  //totla income
  let totalIncome=0;
  for (const item of items) {
    if(item.type==='+'){
      totalIncome+=parseInt(item.value);
    }
  }
//adding totalIncome into HTML page  in p tag and income_amount clases
  document.querySelector('.income__amount p').innerText=`$${totalIncome}`;
}

//show totalExpensess
showTotalExpensess();
function showTotalExpensess(){
    const items= getItemsFromLS();
    //totla expenses
    let totalExpense=0;
    for (const item of items) {
      if(item.type==='-'){
        totalExpense+=parseInt(item.value);
      }
    }
    //adding totalExpenses into p tag under expense_amount classes
  document.querySelector(".expense__amount p").innerText=`$${totalExpense}`;
}

//show totalBalace
showTotlaBalance();
function showTotlaBalance(){
  const items = getItemsFromLS();
  let balance=0;
  for (const item of items) {
    if(item.type==='+'){
      balance+=parseInt(item.value);
    }else{
      balance-=parseInt(item.value);
    }
  }

  document.querySelector('header').className=balance>=0?'green':'red';
  // if (balance>=0) {
  //   document.querySelector('header').className='green';
  // } else {
  //   document.querySelector('header').className='red';
  // }
  document.querySelector(`.balance__amount p`).innerText=`$${balance}`;
}