// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var engwords = [];
    var reverse_dict = {
        "": ""
    };
    for(var key in current_dict) {
        engwords.push(key);
        reverse_dict[current_dict[key]] = key;
    }


	$("#from_lang").html(lang_from);
	$("#to_lang").html(lang_to);
	
	$("#word_to_translate").html(fetch_random(current_dict));
		
	$("#word_input").focus();
	

	function fetch_random(obj) {
		var temp_key, keys = [];
		for(temp_key in obj) {
		   if(obj.hasOwnProperty(temp_key)) {
			   keys.push(temp_key);
		   }
		}
		return obj[keys[Math.floor(Math.random() * keys.length)]];
	}

	var lines = 0;

	function nextWord() {
	    lines++;
	    var iscorrect;
	    var colthree;
	    if ($("#word_input").val() === reverse_dict[$("#word_to_translate").html()]) {
	        iscorrect = "correct";
	        colthree = '<span class="ui-icon ui-icon-check"></span>';
	    } else {
	        // console.log()
	        iscorrect = "wrong";
	        console.log($("#word_to_translate").html());
	        colthree = reverse_dict[$("#word_to_translate").html()];
	    }

	    $("#entry").after('\
	        <div class="row ' + iscorrect + '">\
	          <div class="span4">\
	            <h2>' + $("#word_to_translate").html() + '</h2>\
	          </div>\
	        \
	          <div class="span4">\
	            <h2 id="userword' + lines + '">' + $("#word_input").val() + '</h2>\
	          </div>\
	        \
	          <div class="span4">\
	            <h2>' + colthree + '</h2>\
	          </div>\
	        </div>\
	    ');

	    if (iscorrect === "wrong") {
	        $("#userword" + lines).css("text-decoration","line-through");
	    }

	    $("#word_to_translate").html(fetch_random(current_dict));
	    $("#word_input").val("");
	    $("#word_input").focus();
	    $("#word_input").val("");
	    return;

	}
	
	
	$("#submit").click(nextWord);
	

	$("#word_input").autocomplete({
	    source: engwords,
	    minLength: 2,
	    select: function(event, ui) {
    	    $("#word_input").val(ui.item.value);
    	    nextWord();
    	    $("#word_input").val("");
    	    return false;
	    }
	});
	
	function returnEnterPress(e){
	    var keynum; // set the variable that will hold the number of the key that has been pressed.
	
	    //now, set keynum = the keystroke that we determined just happened...
	    if(window.event) // (IE)
	    {keynum = e.keyCode;}
	
	    else if(e.which) // (other browsers)
	    {keynum = e.which;}
	
	    else{ // something funky is happening and no keycode can be determined...
	        // alert('nothing found');
	        keynum = 0;
	    }
	
	    // now that keynum is set, interpret keynum
	    if(keynum == 13){ // this is Enter (keyascii code 13)
	        return true;
	    }
	    else{ // this is something other than enter
	        return false;
	    }
	}
	
	$("#word_input").keypress(function(e) {
    	if (returnEnterPress(e)) {
        	nextWord();
        	$("#word_input").autocomplete.close();
    	}
	});
	
	
	
	
	
	
	
	

});
