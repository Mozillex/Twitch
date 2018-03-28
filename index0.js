var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","legendarylea","stefl1504","malukah","DizzyKitten","IMP_meles"];

var content= document.getElementById('content');

content.innerHTML = "";

function callTwitch(){//arguments: 1st-> users([]); 2nd-> get type('')

   let args = [...arguments];
   let players = args[0];
   var endType = args[1];
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
            showCard(group[each]);
         }
      }

      else updateCard([players,response]);

	};

	request.send();
}

function showCard(user){

	let name = (user.display_name.length > 2 ? user.display_name : user.login);
	let id = user.id;
   console.log('showCard user_id = '+id);
   //let status = (!user.status) 'offline': user.status;
	let description = user.description;
	let profPic = user.profile_image_url;
	let card = document.createElement('div');
	card.setAttribute('id', id);
	card.innerHTML = "<div class='img'><img src='"+profPic+"'/></div><h1>"+name+"</h1><p>"+description+"</p>";
	content.appendChild(card);
   callTwitch([id],'streams');
}

function updateCard(args) {
   let info = [...arguments];
   let id = info[0][0];
   let response = info[0][1].data;
   let live = (response.length===0?false:true);
   let update = (live? response[0]:null);
	let status = (live? update.type:'offline');

	var card = document.getElementById(id);
	card.setAttribute('class', status);

	let indicator = document.createElement('div');
	indicator.setAttribute('class', 'controls status');
	indicator.innerHTML= "<span class=" + status + ">" + status + "</span>";
	card.appendChild(indicator);

   let text,ctrl,url;

   if (live) {// * * * create the card back * * *
      sideB = document.createElement('div');
      sideB.setAttribute('id', 'B'+id);
      sideB.innerHTML = "<div class='img'><img src='"+update.thumbnail_url+"'/></div><h1>"+update.title+"</h1><p>Game ID: "+ update.game_id +'</p><p>Viewer Count: '+ update.viewer_count +"</p>";
      sideB.style.display = 'none';

      let indicator = document.createElement('div');
      indicator.setAttribute('class', 'controls status');
      indicator.innerHTML= "<span class='live'>LIVE</span>";
      let returnBtn = "<button id='rtn_btn"+id+"'>return</button>";
      sideB.appendChild(indicator);

      let link = document.createElement('div');
   	link.setAttribute('class', 'controls link');
   	link.innerHTML = "<span class=" + status + ">" + returnBtn + "</span>";
   	sideB.appendChild(link);



      document.getElementById('flipSide').appendChild(sideB);

      ctrl = "<button id='btn"+id+"'>view feed</button>";

   } else {

      text = "view channel";
      url = "https://www.twitch.com/" + 'freecodecamp';
      ctrl = "<a href=" + url + " target='_blank'>" + text + "</a>";
   }

   let link = document.createElement('div');
   link.setAttribute('class', 'controls link');
   link.innerHTML = "<span class=" + status + ">" + ctrl + "</span>";
   card.appendChild(link);

   if(live) {
      document.getElementById('btn'+id).addEventListener('click',flipCard);
      document.getElementById('rtn_btn'+id).addEventListener('click',flipCard);
   }

}
var flipped = false;

function flipCard(x){

   let id = this.id.slice(3);
   let id_b = 'B'+id;
   let card = document.getElementById(id);
   let sideB = document.getElementById(id_b);

   if (!flipped){
      document.getElementById('content').replaceChild(sideB,card);
      sideB.style.display = 'block';
      card.style.display = 'none';
      flipped = true;
   }
   else {
      document.getElementById('content').replaceChild(card,sideB);
      card.style.display = 'block';
      sideB.style.display = 'none';
      flipped=false;
   }

}

/*		*** 	setup functions and listeners	***	*/

function init(){
	var input = document.getElementById('input-1');
	let addUser = input.value;
	if (addUser.length>10 || addUser.length<4){
		return alert('invalid entry');
	}
	users.push(addUser);
	content.innerHTML = "";
	input.value="";
	callTwitch(users,'users');
}

callTwitch(users,'users');

document.getElementById("btn-1").addEventListener('click', init);
