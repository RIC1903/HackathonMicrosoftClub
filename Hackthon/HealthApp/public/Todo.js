var Disease = ["back_pain","constipation","abdominal_pain","diarrhoea","mild_fever","yellow_urine",
"yellowing_of_eyes","acute_liver_failure","fluid_overload","swelling_of_stomach",
"swelled_lymph_nodes","malaise","blurred_and_distorted_vision","phlegm","throat_irritation",
"redness_of_eyes","sinus_pressure","runny_nose","congestion","chest_pain","weakness_in_limbs",
"fast_heart_rate","pain_during_bowel_movements","pain_in_anal_region","bloody_stool",
"irritation_in_anus","neck_pain","dizziness","cramps","bruising","obesity","swollen_legs",
"swollen_blood_vessels","puffy_face_and_eyes","enlarged_thyroid","brittle_nails",
"swollen_extremeties","excessive_hunger","extra_marital_contacts","drying_and_tingling_lips",
"slurred_speech","knee_pain","hip_joint_pain","muscle_weakness","stiff_neck","swelling_joints",
"movement_stiffness","spinning_movements","loss_of_balance","unsteadiness",
"weakness_of_one_body_side","loss_of_smell","bladder_discomfort","foul_smell_of urine",
"continuous_feel_of_urine","passage_of_gases","internal_itching","toxic_look_(typhos)",
"depression","irritability","muscle_pain","altered_sensorium","red_spots_over_body","belly_pain",
"abnormal_menstruation","dischromic _patches","watering_from_eyes","increased_appetite","polyuria","family_history","mucoid_sputum",
"rusty_sputum","lack_of_concentration","visual_disturbances","receiving_blood_transfusion",
"receiving_unsterile_injections","coma","stomach_bleeding","distention_of_abdomen",
"history_of_alcohol_consumption","fluid_overload","blood_in_sputum","prominent_veins_on_calf",
"palpitations","painful_walking","pus_filled_pimples","blackheads","scurring","skin_peeling",
"silver_like_dusting","small_dents_in_nails","inflammatory_nails","blister","red_sore_around_nose",
"yellow_crust_ooze"];





// var {spawn} = require("child_process");




var myNodelist = document.getElementsByClassName("rand");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.ClassName === 'rand') {
    ev.target.classList.toggle('checked');
  }
}, false);

var A=[];
// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  var x= document.getElementById("myInput").value;
  if(x!='')
  A.push(x);
  li.appendChild(t);
  if (inputValue !== '') {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}





// var process = spawn('python.exe',["../python/basicSymptoms.py", 
// 1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ); 
// console.log('created child')
// process.on('error', (code) => {
//     console.log('inside error')
//     console.log(`Exit code is: ${code}`);
// });
// process.stdout.on('data', function(data) { 
//     console.log('inside data')
//     console.log(data.toString());

// })

console.log(A);