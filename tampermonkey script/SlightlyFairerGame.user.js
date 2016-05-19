// ==UserScript==
// @name         Slightly fairer game.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Some useful functions for less fair game! Feature 1. Push enter to send message. 2. ColorShifting body. 3. Smoothed Layout.
// @author       Krelsis
// @match        http://bart.vanhauwaert.org/less/?wtd=74CHRBZqFUiQ4Pe1
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js
// ==/UserScript==

(function(w) {

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
			if(rToggle == false)
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
			if(gToggle == false)
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
			if(bToggle == false)
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
			var rgblol = document.getElementById("fairerGame");
            if(typeof(rgblol) != 'undefined') 
			{
				changeBackgroundColor(rgblol);
			    changeBorderColor(rgblol);
			}
			changeBackgroundColor(rgblol2);
			changeBorderColor(rgblol2);
			/*
			changeBorderColor(rgblol2);
			changeBorderColor(rgblol3);
			elements.map(function(el)
			{
				if(typeof(el) !== 'undefined') 
					{
						changeBackgroundColor(el);
					}
			});
			*/
		
			//console.log ("lol i has try rgb("+r+","+g+","+b+")");
		
		}
	
	});

    function init()
    {
        
        var isReady = jQuery(".chatlinespan").length > 0;

        if (!isReady) {
            setTimeout(init, 500);
            return;
        }
        var g = document.getElementsByClassName("playarea")[0];
        g.innerHTML = '<div id="fairerGame" style="margin: 2% auto; padding: 1%; border-radius: 40px;border-style: solid;border-width: 2px;border-color: rgba(60, 120, 255, 0.8); background-color: rgba(30, 80, 255, 0.5);	text-align: center;">Slightly fairer mod activated.</div>' + g.innerHTML;
        console.log("Hello, Slightly fairer game loaded.");
        var t = $(".chatline");
        var b = $(".leftactionbutton");
        var bb = document.getElementsByClassName("actionbutton");
        console.log(t);
        console.log(b);
        $(".chatlinespan input.chatline").on("keypress", function(e) { if(e.which===13) { $(".chatlinespan").prev()[0].click(); }});
        g.style="border-radius:40px;";
        for(var i = 0; i < bb.length; i++)
        {
            bb[i].style="border-radius:40px;margin-left:0.5%;";
        }
        
    }
    
     $(document).ready(
         init()
     );
    
})(window);