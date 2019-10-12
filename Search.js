function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }  
  
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
"yellow_crust_ooze"]
  autocomplete(document.getElementById("myInput"), Disease);