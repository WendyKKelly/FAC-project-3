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

