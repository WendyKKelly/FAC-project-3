let today = new Date();
var day = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = date+' and it is '+time + " o'clock";
 
document.getElementById("displayDateTime").innerHTML = ' Today is ' + daylist[day] + dateTime;


tinymce.init({
    selector: '#textarea',
    width: 600,
    height: 300,
    
  });

  const commentBox = document.querySelector("#textarea");
  if(commentBox) {
    commentBox.addEventListener("submit", function(e) {
      submitForm(e, this);
    });
  }
  async function submitForm(e, form) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);

    const jsonFormData = buildJsonFormData(form);

    const headers = buildHeaders();

    const response = await fetchService.performPostHttpRequest('https://jsonplaceholder.tyicode.come/posts', headers, jsonFormData);

    if(response)
    window.location = '/success.html?Name-$[response.Name]$Email=$[response.Email]&id=$[response.id]';
    else
    alert('an error occured.');
  }

  function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
      jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
  }

  async function performPostHttpRequest(fetchLink, body) {
    if(!fetchLink || !body) {
      throw new Error("One or more POST request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "POST",
        body: JSON.stringify(body)
      });
      const content = await rawResponse.json();
      return content;
    }
    catch(err) {
      console.error(`Error at fetch POST: $({err}`);
      throw err;
    }
  }


  const textarea = document.querySelector("textarea");

  
  // Returns text statistics for the specified editor by id
function getStats(textarea) {
  var body = tinymce.get(textarea).getBody(), text = tinymce.trim(body.innerText || body.textContent);

  return {
      chars: text.length,
      words: text.split(/[\w\u2019\'-]+/).length
  };
}
if (getStats('content').words < 10) {
  alert("You need to enter 10 words or more.");
  return;
}

// Submit the form
document.forms[0].submit();

