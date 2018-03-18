
var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","legendarylea","stefl1504"];//,"malukah","DizzyKitten","IMP_meles"];
var streamArr = [];
var content= document.getElementById('content');

content.innerHTML = "";

function twitch(users){
	for (var each in users){
		let uri = 'https://api.twitch.tv/helix/users' + '?login=' + users[each];
		getUser(uri);
	}
}

function getUser(uri){

	let request = new XMLHttpRequest();

	request.open('GET',uri,true);
	request.dataType = 'json';
	request.responseType = 'json';
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');

	request.onerror = function(){
		console.log("network error. try again later.");
	};


	request.onload = function(){


		if (request.status === 200){
			let response = this.response;
			let data = response.data[0];
			let id= String(data.id);
			showCard(data);
		}

		else {
			console.log('Twitch Fix!! status code = '+request.status+': '+request.statusText);
		}

	};

	request.send();

}

function getStreams(id){

	var status = 'offline';
	var thumbnail;

	let uri = 'https://api.twitch.tv/helix/streams' + '?user_id=' + id;

	let request = new XMLHttpRequest();

	request.open('get',uri,true);
	request.dataType = 'json';
	request.responseType = 'json';
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');
	request.onerror = function(){
		console.log("oops. stream request failed");
	};

	request.onload = function(){
		let response = this.response;


		if (response.data[0]){
			let data = response.data[0];
			status = data.type;
			thumbnail = data.thumbnail_url;
		}
		console.log('status from within getStreams= '+status);
		updateCard([id,status,thumbnail]);
	};

	request.send();

}

function showCard(user){

	let name = user.display_name;

	if (name.length < 2){
		console.log('invalid user name');
		name = user.login;
	};

	var id = user.id;
	let description = user.description;
	let profPic = user.profile_image_url;

	let card = document.createElement('div');
	card.setAttribute('id', id);
	card.innerHTML = "<div class='img'><img src='"+profPic+"'/></div><h1>"+name+"</h1><p>"+description+"</p>";

	content.appendChild(card);
	getStreams(id);

}

function updateCard(data){
	console.log([...arguments]);
	let id = data[0];
	let status = data[1];
	let thumbnail = data[2];
	var live = (status==='live'? true : false);

	let card = document.getElementById(id);
	card.setAttribute('class', status);

	var indicator = document.createElement('div');
	indicator.setAttribute('class', 'controls status');
	indicator.innerHTML= "<span class=" + status + ">" + status + "</span>";
	card.appendChild(indicator);

	var text = (live ? "view feed" : "view channel");
	var url = (live ? thumbnail : "https://www.twitch.com/" + 'freecodecamp'); //********* need to correct this path ********

	var anchor = "<a href=" + url + " target='_blank'>" + text + "</a>";


	var link = document.createElement('div');
	link.setAttribute('class', 'controls link');
	link.innerHTML = "<span class=" + status + ">" + anchor + "</span>";
	card.appendChild(link);
}

twitch(users);

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
	twitch(users);
}

document.getElementById("btn-1").addEventListener('click', init);
