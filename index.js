//take data from user by input form
//select form by id and add submit Evenlistener and off  default form behaviour

document.querySelector('#ewallet-form').addEventListener('submit',function(e){
    e.preventDefault();
   //taking a data from input field by quary selector and value property

    const type = document.querySelector('.add__type').value;
    const desc=document.querySelector('.add__description').value;
    const value=document.querySelector('.add__value').value;
    if (desc&&value) {  //if user input value then ittems will be add
        addItems( type,desc,value); //calling addItems() to add Items that user inputed by sendin user inputed data [type,desc,value]
        resetForm(); //calling resetForm() to reset input field by clearing input data
    }
});

function addItems(type,desc,value){
    //ceate html element block where can show user input data as a record and insert dynamically 
    //user input data according user input
    //using turnary operator chage coler red or green by 
    //if type positive amount then apply income-amount style otherwisw expense-amount
    const newHtmlElementBlock = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>25 Feb, 06:45 PM</p>
      </div>
    </div>
    
    <div class="item-amount ${type==='+'? "income-amount":"expense-amount"}">
      <p> ${type}$ ${value}</p>
    </div>
  </div>
  </div>
`

    // console.log(newHtmlElementBlock);
    //add newHtmlblock element into collection by using insertAdjacentHTML()
    //here afterbein proper use to to isert starting of element in selected (innere)
    const collection=document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newHtmlElementBlock);
}


//creating resetForm() to reset input form by selecting input element type and 
//setting value as empty string
function resetForm(){
    document.querySelector('.add__type').value='+';
    document.querySelector('.add__description').value='';
    document.querySelector('.add__value').value='';
}
