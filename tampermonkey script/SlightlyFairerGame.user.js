// ==UserScript==
// @name         Slightly fairer game.
// @namespace    http://bart.vanhauwaert.org/less/
// @version      0.2.6.6
// @description  Some useful functions for less fair game! Feature 1. Push enter to send message. 2. ColorShifting body. 3. Smoothed/rounded Layout. 4. Name preview
// @author       Krelsis
// @match        http://bart.vanhauwaert.org/less/
// @updateURL    http://krelsis.net/SlightlyFairerGame.user.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js
// @require      https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js
// ==/UserScript==

(function(w) {

    var bstrap = GM_getResourceText("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css");

    GM_addStyle(bstrap);
	
	var mVersion = "0.2.6.6";
	var hName = true;
	var clrs = true;
	var btnGap = true;
	var btnRound = true;
    var strBackup = "null";
    
    $(document).ready(function()
	{
		
		
		
		var rgblol2 = document.body;
		var d = new Date();
		currentTimeStringRed = d.getHours();
		currentTimeStringGreen = d.getMinutes();
		currentTimeStringBlue = d.getSeconds();
		
		
		var r = parseInt(currentTimeStringRed);
		var g = parseInt(currentTimeStringGreen);
		var b = parseInt(currentTimeStringBlue);
		var rToggle = false;
		var gToggle = false;
		var bToggle = false;
		
		setInterval(function incRed()
		{
			if(rToggle === false)
			{
				if (r >= 254)
				{
					rToggle = true;
					incRed();
				}
				else
				{
					//console.log("10 seconds has passed! Incrementing Red!");
					r++;
				}
			}
			else
			{
				if (r <= 1)
				{
					rToggle = false;
					incRed();
				}
				else
				{
					//console.log("10 seconds has passed! Decrementing Red!");
					r--;
				}
			}
			
			
		}, 4000);
		
		setInterval(function incGreen()
		{
			if(gToggle === false)
			{
				if (g >= 254)
				{
					gToggle = true;
					incGreen();
				}
				else
				{
					//console.log("A second has passed! Incrementing Green!");
					g++;
				}
			}
			else
			{
				if (g <= 1)
				{
					gToggle = false;
					incGreen();
				}
				else
				{
					//console.log("A second has passed! Decrementing Green!");
					g--;
				}
			}
			
		}, 400);
		
		
		setInterval(function incBlue()
		{
			if(bToggle === false)
			{
				if (b >= 254)
				{
					bToggle = true;
					incBlue();
				}
				else
				{
					//console.log("50 milliseconds has passed! Incrementing Blue!");
					b++;
					updateColors();
				}
			}
			else
			{
				if (b <= 1)
				{
					bToggle = false;
					incBlue();
				}
				else
				{
					//console.log("50 milliseconds has passed! Decrementing Blue!");
					b--;
					updateColors();
				}
			}
			
		
		}, 20);
		
		function changeBackgroundColor(me)
		{
			
			me.style.backgroundColor = "rgba("+r+","+g+","+b+",0.5";
			
			


		}
		
		function changeBorderColor(me)
		{
			
			
			me.style.borderColor = "rgba("+r+","+g+","+b+",0.8";
			


		}
		
		function updateColors()
		{
			
			if(clrs===true)
			{
			var rgblol = document.getElementById("fairerGame");
            if(typeof(rgblol) !== 'undefined') 
			{
				changeBackgroundColor(rgblol);
			    changeBorderColor(rgblol);
			}
			changeBackgroundColor(rgblol2);
			changeBorderColor(rgblol2);
			}
			
            var g = document.getElementsByClassName("playarea")[0];
            var b = document.getElementsByClassName("leftactionbutton")[0];
            var bb = document.getElementsByClassName("actionbutton");
            
			if (btnRound===true)
			{

				g.style="border-radius:40px;";
				b.style="border-radius:40px;";
				for(var i = 0; i < bb.length; i++)
				{
					bb[i].style="border-radius:40px;";
				}
			}
			else
			{
				
				g.style.borderRadius="0px";
				b.style.borderRadius="0px";
				for(var m = 0; m < bb.length; m++)
				{
					bb[m].style.borderRadius="0px";
				}
			}
			
			if(btnGap===true)
			{
				for(var x = 0; x < bb.length; x++)
				{
					bb[x].style.marginLeft="0.5%";
				}
			}
			else
			{
				for(var z = 0; z < bb.length; z++)
				{
					bb[z].style.marginLeft="0px";
				}
			}
			
			
			if (hName===true)
			{
				if(strBackup=="null")
				{
					$('.rightalign').each(function(index,el){
						var selectedEl = $(el).find('span');
						var selectedEl2 =  selectedEl.slice(0,1);;
						var txt = selectedEl2.text();
                        strBackup = "<span>" + selectedEl2.html() + "</span>";
						txt = txt.replace("&lt;","<");
						txt = txt.replace("&gt;",">");
                        txt = "<span>" + txt + "</span>";
						selectedEl.replaceWith(function() {return txt;});
						
					});
				}
			}
			else
			{
				if(strBackup!=="null")
				{
					$('.rightalign').each(function(index,el){
							var selectedEl = $(el).find('span');
							var selectedEl2 =  selectedEl.slice(0,1);
							var txt = "";
							txt = strBackup;
							strBackup = "null";
							selectedEl.replaceWith(function() {return txt;});
						});
				}
				
			}
			
            
           
            
		
		}
	
	});

	
	function toggleClrShift() 
	{
		clrs = !clrs;
	}
	
	function toggleBtnRnd() 
	{
		btnRound = !btnRound;
	}
	
	function toggleBtnGap() 
	{
		btnGap = !btnGap;
	}
	
	function toggleNamePrv() 
	{
		hName = !hName;
	}
	
    function init()
    {
        
        var isReady = jQuery(".chatlinespan").length > 0;

        if (!isReady) {
            setTimeout(init, 500);
            return;
        }
        var g = document.getElementsByClassName("playarea")[0];
        g.innerHTML = '<div id="fairerGame" style="margin: 2% auto; padding: 1%; border-radius: 40px;border-style: solid;border-width: 2px;border-color: rgba(60, 120, 255, 0.8); background-color: rgba(30, 80, 255, 0.5);	text-align: center;">Slightly fairer mod V' + mVersion + ' activated. </div> <div id="fairerGameControls" style="text-align:center;"><button id="tglClrs" type="button" class="actionbutton Wt-btn with-label" >Toggle color Shift(Stop on current color).</button><button id="tglBRnd" type="button" class="actionbutton Wt-btn with-label" >Toggle rounded Buttons.</button><button id="tglBGap" type="button" class="actionbutton Wt-btn with-label" >Toggle Button Gap.</button><button id="tglHName" type="button" class="actionbutton Wt-btn with-label" >Toggle html name preview.</button></div>' + g.innerHTML;
        console.log("Hello, Slightly fairer game V" + mVersion + " loaded.");
        var t = $(".chatline");
        
        $(".chatlinespan input.chatline").on("keypress", function(e) { if(e.which===13) { $(".chatlinespan").prev()[0].click(); }});
		
		document.getElementById ("tglClrs").addEventListener (
			"click", toggleClrShift, false
		);
		document.getElementById ("tglHName").addEventListener (
			"click", toggleNamePrv, false
		);
		document.getElementById ("tglBGap").addEventListener (
			"click", toggleBtnGap, false
		);
		document.getElementById ("tglBRnd").addEventListener (
			"click", toggleBtnRnd, false
		);
        
    }
    
     $(document).ready(
         init()
     );
    
})(window);