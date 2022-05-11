

console.log('this is postman clone');
// intiallize the no of parameters
let addParamCount = 0;
//utitly function 
//1.utilty function to get dom element form string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;

}
//hide the parameterbox initially bucause the radio button is by deflluat on json 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
// if anyone click on custom parameters then we will hide the json box and show the parameterbox
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})
// if anyone click on json then we will heide he parameterbox and show the json box intead of custom parameterbox
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})
// if the users click on plus button then we will add more param
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-3 mx-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Key">
                    </div>
                    <div class="col-md-4"> <input type="text" class="form-control" id="parameterValue${addParamCount + 2}"
                            placeholder="Enter Parameter${addParamCount + 2}Value">
                    </div>
                    <button  class="btn btn-primary deleteParam">-</button>
   </div>`
    //convert the element string to DOM NODE;
    let paramElement = getElementFromString(string)
    params.appendChild(paramElement)
    // add the event listisner to remove the delete parameter
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            //to do i will add confirmation box on the delete button 
            //   alert('do you want to delete this parameter')     

        })
    }
    addParamCount++;
});
//if the user click on the submit 
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    // show the patincen in the request box for while before the fetching apies
    document.getElementById('responsePrism').innerHTML = "Please wait.. fetching apies";
    // fetch all the values user had entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    /// log in console for debuging
  
    // if users  use the params option for the parameter s intead of json

    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('responsePrism').innerHTML;
    }
    console.log('url is', url)
    console.log('request Type is', requestType)
    console.log('content Type is', contentType)
    console.log('data is', data);
    
    // the requesttype is get then we will invokes the fetch api to a get request
    if(requestType=='GET'){
        fetch(url, {
            method:'GET',
        })
        .then(response=> response.text())
        .then((text) => {
            let response = document.getElementById('responsePrism').innerHTML= text;
            Prism.highlightAll()
        })
    }
    // if the requesttype is post then we will invokes the fetch api to a post request
    else{
        fetch(url, {
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=> response.text())
        .then((text) => {
            let response = document.getElementById('responsePrism').innerHTML= text;
            Prism.highlightAll()
        })
    }
})