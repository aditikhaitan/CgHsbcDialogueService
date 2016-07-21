$(document).ready(function(){
	ajaxCall("");
	$('textarea#msgArea').on('keyup', function(e) {
		  if(e.which == 13) {
			  var reqMsg=$('textarea#msgArea').val();
		    	 console.log("MSG VAL:"+reqMsg);
		    	 if(reqMsg==""||reqMsg=="null"||reqMsg==" \n\t\t\t")
		    		 {
		    		// alert("This field is required");
		    		 return false;
		    		 }
		      $('#btn').trigger('click');
		  }
		});
    $("#btn").click(function(){
    	 var reqMsg=$('textarea#msgArea').val();
    	 console.log("MSG VAL:"+reqMsg);
    	 if(reqMsg==""||reqMsg=="null"||reqMsg==" \n\t\t\t")
    		 {
    		// alert("This field is required");
    		 return false;
    		 }

        $("#scroller").append('<p id="request">'+reqMsg+'</p>');
        $("p#request").addClass("request");
        $('textarea#msgArea').val("");
        $("#scroller").append('<center><img id="loadIMG" src="./images/load.gif" alt="Waiting..." style="width:30px;height:30px;"><center>');
        $("#scroller").scrollTop($("#scroller")[0].scrollHeight);
        
        //$("#scroller").animate({ scrollTop: $("#scroller").scrollTop($("#scroller")[0].scrollHeight)}, 5000);
/*        var jqxhr =
            $.ajax({
                url: "/target.jsp",
                type : "GET",
                data: {
                    param1 : "value1",
                    param2 : "value2"
                }
            })
            .done (function(data) {  process data  })
            .fail (function()  { alert("Error ")   ; })
            ;*/
        ajaxCall(reqMsg);
    	
    });
});
function ajaxCall(requestData)
{
	console.log("request client ID:"+$('input#clientID').val());
	console.log("request conversation ID:"+$('input#conversationID').val());
	 var theObject = { input: requestData,client_id:$('input#client_id').val(),conversation_id:$('input#conversationID').val() };
	$.ajax({
        url: './spring/hello',
        //dataType: 'json',
        type: 'GET',
        data: {
            clientMSG : JSON.stringify(theObject),
        },
        success: function( data, textStatus, jQxhr ){
        	console.log("Test Data");
        	console.log(data);
        	
        	var responseData = JSON.parse(data);
            console.log(responseData.response);
            console.log(responseData.client_id);
            console.log(responseData.conversation_id);
            console.log($("img#loadIMG").length);
            if($("img#loadIMG").length!=0)
            {
            	$("img#loadIMG").remove();
            }
            
            $('<input>').attr({
                type: 'hidden',
                id: 'clientID',
                value:responseData.client_id,
            }).appendTo('#scroller');
            
            $('<input>').attr({
                type: 'hidden',
                id: 'conversationID',
                value:responseData.conversation_id,
            }).appendTo('#scroller');
            $("#scroller").append('<p id="response">'+responseData.response+'</p>');
            $("p#response").addClass("response");
            $("#scroller").scrollTop($("#scroller")[0].scrollHeight);
        },
        error: function( jqXhr, textStatus, errorThrown ){
        	console.log("Error Data");
            console.log( errorThrown );
        }
    });
}