
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
`
    //add newHtmlblock element into collection div by using insertAdjacentHTML()
    const collection=document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newHtmlElementBlock);  //here afterbein proper use to to isert starting of element in selected (innere)
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


// Store user inputed data into local storage as joson format as key value pair and render it from local storage


