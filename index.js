var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","legendarylea","stefl1504","malukah","DizzyKitten","IMP_meles"];
var apiData1 = {};
var apiData2 = {};

function get(id){
   return document.getElementById(id);
}

function newEl(el){
   return document.createElement(el);
}

var content = get('content');
var opened = 0;

function callTwitch(){

   let args = [...arguments];
   let players = args[0];
   var endType = args[1];
   let login = (args[2] ? args[2] : '');
   let params = args[1] + (endType==='users'?'?login=':'?user_id=');
   let multiPlayers = (players.length>1?true:false);
   let concat = (endType==='users'?'&login=':'&user_id=');
   let uri = 'https://api.twitch.tv/helix/'+ params + (multiPlayers===true? players.join(concat) : players);

   let request = new XMLHttpRequest();
	request.open('GET',uri,true);
	request.dataType = 'json';
	request.responseType = 'json';
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');
	request.onerror = function(){
		console.log("network error. try again later.");
	};

	request.onload = function(){

		if (request.status !== 200) return alert('API Request error\n'+request.status+': '+request.statusText);

      let response = this.response;

      if (response.error) return alert('Network Error\n'+response.error +': '+response.status+"\nPlease try again.");


      else {

         let group = response.data;

         if (group.length > 1){
            content.innerHTML = "";
            for (each in group) {
               makeCard(group[each]);
            };
         }

         else updateFront([players,response,login]);
      }
	};

	request.send();
}


function makeCard(user){

   let name = (user.display_name.length > 2 ? user.display_name : user.login);
	let id = user.id;
   let login = user.login;
	let description = user.description;
	let profPic = user.profile_image_url;

   let head = newEl('div');//container for front and back
   head.setAttribute('id', 'H'+id);

	let front = newEl('div');
	front.setAttribute('id', 'F'+id);

   let picDiv = newEl('div');
   picDiv.setAttribute('class','img');

   let profImg = newEl('img');
   profImg.src = profPic;

   let h1 = newEl('h1');
   h1.innerText = name;

   let p = newEl('p');
   p.innerText = description;

   content.appendChild(head);
   head.appendChild(front);
   front.appendChild(picDiv);
   picDiv.appendChild(profImg);
   front.appendChild(h1);
   front.appendChild(p);

   callTwitch([id],'streams',login);
}


function updateFront(args) {
   let id = args[0][0];//this is the same as user id
   let response = args[1].data;

   let login = args[2];

   let live = (response[0]? true : false);
   let status = (live? response[0].type :'offline');

   if (live) console.log(id+', '+response+', '+login);

	let front = get('F' + id);
	front.className = status;

	let indicator = newEl('div');
	indicator.className = 'controls status';

   let span = newEl('span');
   span.className = status;
   span.textContent = status;

   let link = newEl('div');
   link.className = 'controls link';

   let btn = newEl('div');
   btn.id = 'btn'+id;
   btn.className = 'button';

   btn.flipped = false;
   btn.innerText = (live? "view feed": "view channel");
   btn.name = login;
   btn.feed = live;
   btn.codeNum = id;

   btn.href = "https://player.twitch.tv?channel=" + login + "&autoplay=false";

   btn.target = '#iF'+id;

   btn.onclick = flipCard;

   link.appendChild(btn);

   front.appendChild(indicator);
   indicator.appendChild(span);
	front.appendChild(link);

   makeBack(login,id,live,status);
}


function makeBack(login,id,live,status){

   let head = get('H'+id);

   let back = newEl('div');
   back.id = 'B'+id;
   back.style.display = 'none';

   let divFrame = newEl('div');

   let frame = newEl('iframe');
   frame.id = 'iF' + id;
   frame.name = 'iF' + id;
   frame.setAttribute('width','400');
   frame.setAttribute('height','300');
   frame.setAttribute('frameborder','0');
   frame.setAttribute('scrolling','no');
   frame.setAttribute('allowfullscreen','false');

   let h1 = newEl('h1')
   h1.innerText = 'update.title';

   let p1 = newEl('p');
   p1.textContent = 'Game ID: '+'update.game.id';

   let p2 = newEl('p2');
   p2.textContent = 'Viewer Count: '+ 'update.viewer_count';

   let indicator = newEl('div');
   indicator.className = 'controls status';

   let span = newEl('span');
   span.className = status;
   span.textContent = live? "LIVE": "OFFLINE";

   let link = newEl('div');
   link.className = 'controls link';

   let rtnBtn = newEl('div');
   rtnBtn.className = 'button';
   rtnBtn.id = 'rtn_btn'+ id;
   rtnBtn.name = login;
   rtnBtn.innerText = 'close';
   rtnBtn.codeNum = id;
   rtnBtn.flipped = true;
   rtnBtn.onclick = flipCard;

   head.appendChild(back);
   back.appendChild(divFrame);
   divFrame.appendChild(frame);

   back.appendChild(h1);
   back.appendChild(p1);
   back.appendChild(p2);

   back.appendChild(indicator);
   indicator.appendChild(span);

   back.appendChild(link);
   link.appendChild(rtnBtn);
}


function flipCard(e){

   var id = this.codeNum;
   var login = this.name;

   var front = get('F'+id);
   var back = get('B'+id);
   var frame = get('iF'+id);

   if (this.flipped===false){

      frame.src = this.href;
      //window.open(uri,frame.name);
      front.style.display = 'none';
      back.style.display = 'block';
      opened +=1;
   }

   else {
      front.style.display = 'block';
      back.style.display = 'none';
      frame.src = "";
      opened -= 1;
   }

   if (opened > 5) alert("y. u. so twitchy?!\nyou really tryin' 2 watch\nall these streams?");
}


function init(){
	var input = get('input-1');
	let addUser = input.value;
	if (addUser.length>10 || addUser.length<4){
		return alert('invalid entry');
	}
	users.push(addUser);
	content.innerHTML = "";
	input.value="";
	callTwitch(users,'users');
}

get('btn-1').addEventListener('click', init);

callTwitch(users,'users');
