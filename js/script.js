var color; // 색상값
		var isFirstMake = true; // greedSize 함수에서 사용
		var greedType; // greedSize, makeGreed 함수에서 사용
		var selectColorNum;
		var palletteTabNum;
		var basePallette = [];
		var customPallette = [];
		var isMouseDowned;

		window.onload = function() {
			document.getElementById("8").checked = true;
			greedSize(8);
			basePallette[0] = "#ffffff";
			basePallette[1] = "#000000";
			basePallette[2] = "#c3c3c3";
			basePallette[3] = "#7f7f7f";
			basePallette[4] = "#b67a57";
			basePallette[5] = "#880015";
			basePallette[6] = "#ffaec9";
			basePallette[7] = "#ed1c0e";
			basePallette[8] = "#ffc90e";
			basePallette[9] = "#ff7f27";
			basePallette[10] = "#efe4b0";
			basePallette[11] = "#fff200";
			basePallette[12] = "#b5e61d";
			basePallette[13] = "#22b14c";
			basePallette[14] = "#99d9fe";
			basePallette[15] = "#00a2e8";
			basePallette[16] = "#7092be";
			basePallette[17] = "#3f48cc";
			basePallette[18] = "#c8bfe7";
			basePallette[19] = "#a349a4";
			for(i = 0; i < 20; i++)
			{
				customPallette[i] = "#ffffff";
			}
			palletteTab(1);
			colorSelect(1);

		}

		window.onmouseup = function() {
			mouseUp();
		}
		window.oncontextmenu = function() {
			return false;
		}
		window.document.onselectstart = function() {
			return false;
		}
		window.document.ondragstart = function() {
			return false;
		}

		function makeGreed(value) {
			var data = "";
			for(var i = 0; i < value * value; i++) {
				data += '<li id = "panel' + i + '"' + 'onmouseover="paint(' + i + ')" onmouseup="mouseUp()" onmousedown="mouseDown(' + i + ')">' + i + "</li>";
			}
			document.getElementById("dots").innerHTML = data;

			var li = document.querySelectorAll("#dots li");
			for(var i = 0; i < value * value; i++) {
				var px = 640 / value - 1;
				li[i].style.width= px + "px";
				li[i].style.height=px + "px";
				li[i].style.backgroundColor = "#FFF"
			}
			greedType = value;
		}

		function greedSize(value) {
			if(isFirstMake == true)
			{
				makeGreed(value);
				isFirstMake = false;
			}
			else
			{
				var result = confirm("크기를 변경하면 그린 내용이 사라집니다. \n변경하시겠습니까?");
				if(result)
				{
					makeGreed(value);
				}
				else
				{
					switch(greedType)
					{
						case 8:
							document.getElementById("8").checked = true;
							document.getElementById("16").checked = false;
							document.getElementById("32").checked = false;
							break;
						case 16:
							document.getElementById("8").checked = false;
							document.getElementById("16").checked = true;
							document.getElementById("32").checked = false;
							break;
						case 32:
							document.getElementById("8").checked = false;
							document.getElementById("16").checked = false;
							document.getElementById("32").checked = true;
							break;
					}
				}
			}
		}

		function mouseUp() {
			isMouseDowned = false;
		}

		function mouseDown(i) {
			isMouseDowned = true;
			id = "panel" + i;
			document.getElementById(id).style.backgroundColor=color;
		}

		function paint(i) {
			if(isMouseDowned)
			{
				id = "panel" + i;
				document.getElementById(id).style.backgroundColor=color;
			}
		}

		function colorSelect(i) {
			for(var j = 0; j < 20; j++) {
				id = "color" + j;
				document.getElementById(id).style.borderColor="#e0e0e0"
			}
			id = "color" + i;
			document.getElementById(id).style.borderColor="#999999"
			color = document.getElementById(id).style.backgroundColor;
			selectColorNum = i;
		}


		function palletteTab(value)
		{
			var data = "";
			for(i = 0; i < 20; i++)
			{
				data += '<li id="color' + i + '" onclick=colorSelect(' + i + ')>' + i + "</li>";
			}

			document.getElementById("pallette_dots").innerHTML = data;

			switch(value)
			{
			case 1:
				for(i = 0; i < 20; i++)
				{
					document.getElementById("color"+i).style.backgroundColor = basePallette[i];
				}
				palletteTabNum = 1;
				break;
			case 2:
				for(i = 0; i < 20; i++)
				{
					document.getElementById("color"+i).style.backgroundColor = customPallette[i];
				}
				palletteTabNum = 2;
				break;
			}
		}

		function bg() {
			var result = confirm("이 기능을 사용하면 그린 내용이 사라집니다. \n사용하시겠습니까?");
			if(result)
			{
				if(document.getElementById("8").checked) {
					for(var i = 0; i < 8*8; i++) {
						id = "panel" + i;
						document.getElementById(id).style.backgroundColor=color;
					}
				}
				else if(document.getElementById("16").checked) {
					for(var i = 0; i < 16*16; i++) {
						id = "panel" + i;
						document.getElementById(id).style.backgroundColor=color;
					}
				}
				else if(document.getElementById("32").checked) {
					for(var i = 0; i < 32*32; i++) {
						id = "panel" + i;
						document.getElementById(id).style.backgroundColor=color;
					}
				}
			}
		}

		function save() {
			var ctx = document.getElementById("image").getContext("2d");
			document.getElementById("image").style.width="640px";
			document.getElementById("image").style.height="640px";
			document.getElementById("image").width="640";
			document.getElementById("image").height="640";
			if(document.getElementById("8").checked) {
				for(var i = 0; i < 8*8; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%8)*80,(Math.floor(i/8))*80,80,80);
				}
			}
			else if(document.getElementById("16").checked) {
				for(var i = 0; i < 16*16; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%16)*40,(Math.floor(i/16))*40,40,40);
				}
			}
			else if(document.getElementById("32").checked) {
				for(var i = 0; i < 32*32; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%32)*20,(Math.floor(i/32))*20,20,20);
				}
			}
			var image = document.getElementById("image").toDataURL("image/png").replace("image/png", "image/octet-stream");
			//window.location.href=image;

			$('#downloadLink').prop('href', image); 
			$('#downloadLink').prop('download', 'dotoshop.png');
			$('#downloadLink')[0].click();

		}

		function colorChange(customColor)
		{
			for(var j = 0; j < 20; j++) {
				id = "color" + j;
				document.getElementById(id).style.borderColor="#e0e0e0"
			}
			color = "#" + customColor;
			if(palletteTabNum == 2)
			{
				document.getElementById("color" + selectColorNum).style.backgroundColor = color;
				document.getElementById("color" + selectColorNum).style.borderColor="#e0e0e0"
				customPallette[selectColorNum] = color;
			}
		}

		function twitter()
		{
			var ctx = document.getElementById("image").getContext("2d");
			document.getElementById("image").style.width="640px";
			document.getElementById("image").style.height="640px";
			document.getElementById("image").width="640";
			document.getElementById("image").height="640";
			if(document.getElementById("8").checked) {
				for(var i = 0; i < 8*8; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%8)*80,(Math.floor(i/8))*80,80,80);
				}
			}
			else if(document.getElementById("16").checked) {
				for(var i = 0; i < 16*16; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%16)*40,(Math.floor(i/16))*40,40,40);
				}
			}
			else if(document.getElementById("32").checked) {
				for(var i = 0; i < 32*32; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%32)*20,(Math.floor(i/32))*20,20,20);
				}
			}
			var image = document.getElementById("image").toDataURL("image/png").replace('data:image/png;base64,','');
			var imageUri;

      		$.ajax({ 
      		    url: 'https://api.imgur.com/3/upload',
				type: 'POST',
      		    headers: {
      		        'Authorization': 'Client-ID a9224842c054cae'
      		    },
      		    
      		    data: {
      		        'image': image,
      		        'type' : 'base64'
      		    },
      		    success: function(data) {
      		    	imageUri = data['data']['link']

      		    	var query = '?nocache=' + Math.floor(Math.random()*10);
      		    	query += '&url='+encodeURIComponent(location.href);
      		    	query += '&text='+encodeURIComponent(imageUri);
      		    	var new_window = window.open('http://twitter.com/share' + query,'', 'toolbar=0, status=0, width=600, height=400');

      		    },
      		    error: function(e) { alert('이미지 업로드 실패'); return; }
      		});
		}
		function facebook()
		{
			var ctx = document.getElementById("image").getContext("2d");
			document.getElementById("image").style.width="640px";
			document.getElementById("image").style.height="640px";
			document.getElementById("image").width="640";
			document.getElementById("image").height="640";
			if(document.getElementById("8").checked) {
				for(var i = 0; i < 8*8; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%8)*80,(Math.floor(i/8))*80,80,80);
				}
			}
			else if(document.getElementById("16").checked) {
				for(var i = 0; i < 16*16; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%16)*40,(Math.floor(i/16))*40,40,40);
				}
			}
			else if(document.getElementById("32").checked) {
				for(var i = 0; i < 32*32; i++) {
					id = "panel" + i;
					ctx.fillStyle = document.getElementById(id).style.backgroundColor;
					ctx.fillRect((i%32)*20,(Math.floor(i/32))*20,20,20);
				}
			}
			var image = document.getElementById("image").toDataURL("image/png").replace('data:image/png;base64,','');
			var imageUri;
      		$.ajax({ 
      		    url: 'https://api.imgur.com/3/upload',
				type: 'POST',
      		    headers: {
      		        'Authorization': 'Client-ID a9224842c054cae'
      		    },
      		    
      		    data: {
      		        'image': image,
      		        'type' : 'base64'
      		    },
      		    success: function(data) {
      		    	imageUri = data['data']['link']

      		    	var query = '';
					query += '&p[url]='+encodeURIComponent(imageUri);

      		    	var new_window = window.open('http://www.facebook.com/sharer.php?s=100' + query,'', 'toolbar=0, status=0, width=600, height=400');

      		    },
      		    error: function(e) { alert('이미지 업로드 실패'); return; }
      		});
		}
