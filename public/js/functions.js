const myForm = document.querySelector('form');
const inputField = document.querySelector('input')

const city = document.querySelector('#labelCity');
const details = document.querySelector('#labelDetails');
const temp = document.querySelector('#labelTemp');
const precip = document.querySelector('#labelPrecip');

myForm.addEventListener('submit',(e) => {
    e.preventDefault();
    city.textContent = 'loading...';
    details.textContent ='';
    temp.textContent ='';
    precip.textContent ='';
    fetch("http://localhost:3000/weather?city="+inputField.value).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                city.textContent = data.error;
                details.textContent ='';
                temp.textContent ='';
                precip.textContent ='';
            }else{
                city.textContent = "Weather forecast for " + data.location;
                details.textContent ="Weather Condition for the day is " + data.weatherCondition;
                temp.textContent ="Current temperature is " + data.temperature;
                precip.textContent ="rain precipitation is " + data.precip;
            }
        })
    })
})