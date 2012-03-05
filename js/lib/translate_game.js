// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
    var reverse_dict = {
        "": ""
    };
	for( key in current_dict) {
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
	
	$("#submit").click(function() {
    	lines++;
    	var iscorrect;
    	var colthree;
    	if ($("#word_input").val() === current_dict[$("#word_to_translate").html()]) {
        	iscorrect = "correct";
        	colthree = '<span class="ui-icon ui-icon-check"></span>';
    	} else {
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
		        <h2 id="userword' + lines + '>' + $("#word_input").val() + '</h2>\
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
		
	});
	
	

});
