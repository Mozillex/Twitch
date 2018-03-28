var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","legendarylea","stefl1504","malukah","DizzyKitten","IMP_meles"];

function get(id){
   return document.getElementById(id);
}

function newEl(el){
   return document.createElement(el);
}

var content= get('content'), flipped = false;

content.innerHTML = "";

function callTwitch(){//arguments: 1st-> users([]); 2nd-> get type('')

   let args = [...arguments];
   let players = args[0];
   var endType = args[1];
   let login = args[2];
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
		if (request.status !== 200){
         return console.log('Twitch Fix!! status code = '+request.status+': '+request.statusText);
		}

      let response = this.response;

      if (response.error) return console.log(response.error +': '+ response.status);

      let group = response.data;

      if (group.length > 1){
         for (each in group) {
            makeCard(group[each]);
         }
      }

      else updateFront([players,response,login]);

	};

	request.send();
}

function makeCard(user){

	let name = (user.display_name.length > 2 ? user.display_name : user.login);
	let id = user.id;
   let wrp_id = 'wrp_'+id;
   let login = user.login;
	let description = user.description;
	let profPic = user.profile_image_url;

   let head = newEl('div');//container for front and back
   head.setAttribute('id', wrp_id);

	let card = newEl('div');//front of card
	card.setAttribute('id', id);
   let picDiv = newEl('div');
   picDiv.setAttribute('class','img');
   let profImg = newEl('img');
   profImg.src = profPic;
   let h1 = newEl('h1');
   h1.innerText = name;
   let p = newEl('p');
   p.innerText = description;

   let content = get('content');
   content.appendChild(head);
   head.appendChild(card);
   card.appendChild(picDiv);
   picDiv.appendChild(profImg);
   card.appendChild(h1);
   card.appendChild(p);

   callTwitch([id],'streams',login);
}
var live;

function updateFront(args) {

   let id = args[0][0];
   let response = args[1].data;
   let login = args[2];
   live = (response[0]?true:false);
   let status = (live? response[0].type :'offline');

	let card = get(id);
	card.setAttribute('class', status);

	let indicator = newEl('div');
	indicator.setAttribute('class', 'controls status');
   let span = newEl('span');
   span.setAttribute('class', status);
   span.textContent = status;

   let link = newEl('div');
   link.setAttribute('class', 'controls link');

   let btn = newEl('div');
   btn.setAttribute('class', 'button');
   btn.id = 'btn'+id;
   btn.name = login;
   let tail = login + '&autoplay=false';
   btn.setAttribute('href',live? "http://player.twitch.tv?" + tail : "https://www.twitch.tv/" + tail);

   btn.innerText = (live? "view feed": "view chanel");
   btn.onclick = flipCard;

   link.appendChild(btn);//(i)

   card.appendChild(indicator);
   indicator.appendChild(span);
	card.appendChild(link);

   makeBack(login,id);


}

function makeBack(login,id){

   console.log(status);

   sideB = newEl('div');
   sideB.setAttribute('id', 'B'+id);
   sideB.style.display = 'none';


   let divFrame = newEl('div');
   let iFrame = newEl('iframe');
   iFrame.setAttribute('id','iF'+id);
   iFrame.setAttribute('width','400');
   iFrame.setAttribute('height','300');
   iFrame.setAttribute('frameborder','0');
   iFrame.setAttribute('scrolling','no');
   iFrame.setAttribute('allowfullscreen','false');

   let h1 = newEl('h1')
   h1.innerText = 'update.title';
   let p1 = newEl('p');
   p1.textContent = 'Game ID: '+'update.game.id';
   let p2 = newEl('p2');
   p2.textContent = 'Viewer Count: '+ 'update.viewer_count';

   let indicator = newEl('div');
   indicator.setAttribute('class', 'controls status');
   let span = newEl('span');
   span.setAttribute('class', status);
   span.textContent = live? "LIVE": "OFFLINE";

   let link = newEl('div');
   link.setAttribute('class', 'controls link');

   let rtnBtn = newEl('div');
   rtnBtn.setAttribute('class', 'button');
   rtnBtn.setAttribute('id','rtn_btn'+ id);
   rtnBtn.setAttribute('name','return'+login);
   rtnBtn.innerText = 'return';
   rtnBtn.onclick = flipCard;

   let head = 'wrp_'+id;
   get(head).appendChild(sideB);
   sideB.appendChild(divFrame);
   divFrame.appendChild(iFrame);
   sideB.appendChild(h1);
   sideB.appendChild(p1);
   sideB.appendChild(p2);
   sideB.appendChild(indicator);
   indicator.appendChild(span);
   sideB.appendChild(link);
   link.appendChild(rtnBtn);
}

function flipCard(e){

   let login = this.name;

   if (!flipped){
      let id = this.id.slice(3);
      let id_b = 'B'+id;
      let id_iF = 'iF'+id;
      get(id).style.display = 'none';
      get(id_b).style.display = 'block';
      let tail = login +'&autoplay=false';
      let uri = live? 'http://player.twitch.tv?channel=' + tail : "https://www.twitch.tv/" + tail;
      get(id_iF).src = uri;//'http://player.twitch.tv?channel=' + login +'&autoplay=false';
      flipped = true;
   }
   else {
      let id = this.id.slice(7);
      let id_b = 'B'+id;
      get(id).style.display = 'block';
      get(id_b).style.display = 'none';
      flipped=false;
   }

}

/*		*** 	setup functions and listeners	***	*/

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
callTwitch(users,'users','');

get('btn-1').addEventListener('click', init);

get('mod_btn').addEventListener('click',close);
function close(){
   get('modal').style.display = 'none';
}
