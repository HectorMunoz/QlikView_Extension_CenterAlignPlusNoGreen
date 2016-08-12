/*
Original centerAling extension script by Brian Munz
URL: https://community.qlik.com/thread/58729

Original NoGreen extension script by Barry Harmsem
URL: https://community.qlik.com/docs/DOC-3140

Modified by Héctor Muñoz 2016-08-12
Tested in QV 11.20 SR12
*/

var cApath = Qva.Remote + "?public=only&type=Document&name=Extensions/centerAlignPlusNoGreen/";
Qva.LoadCSS(cApath + "style.css");
Qva.LoadCSS(cApath + "NoGreen.css"); //NoGreen CSS
Qva.AddDocumentExtension('centerAlignPlusNoGreen', function() {
	var _this = this;
	//default width is 1024 to act as a minimum width for your content

	function centerIt() {
		if(!($("body").hasClass("centerAlign"))) {
			$("body").addClass("centerAlign");
			//wrap a container around the whole document and center it.
			$("body").append('<div class="master" />').find('.master').append($('#PageContainer'));
			$("#MainContainer").css("position", "relative");
			//center the tabs if they exist
			$("head").append("<style>.qvtr-tabs{margin:0 auto !important;}</style>");
			//center the background image if there is one.
			$("body").css("background-position", "center 30px");
		}
		var maxRight = 1024;
		//loop through all QV alements on the page and determine the maximum right position on the page
		//in order to determine the bounding box of the QV doc.  It needs to be done this way because all of the elements
		//are absolutely positioned
		$(".QvFrame").each(function(){
			var tMR = $(this).position().left + $(this).width();
			if(tMR > maxRight){
				maxRight = tMR;
			}
		});
		$(".centerAlign .master").css("width", maxRight + "px");
		$(".qvtr-tabs").css("width", $(".master").width() + "px");
		//NoGreen script
		$('img.Qv_LED').attr("src","/QvAjaxZfc/QvsViewClient.aspx?datamode=binary&name=LED&host=Local&slot=&public=only&color=%230099ff" );
	}
	_this.Document.SetOnUpdateComplete(centerIt);
});
