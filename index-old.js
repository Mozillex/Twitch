
var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","legendarylea","stefl1504","malukah","DizzyKitten","IMP_meles"];
var content= document.getElementById('content');

content.innerHTML = "";

function getUsers(){

	let request = new XMLHttpRequest();
	let uri = 'https://api.twitch.tv/helix/users' + '?login=' + users.join('&login=');

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
			let group = response.data;
			for (each in group){
				//let id= user[each].id;
				showCard(group[each]);
			}

		}

		else {
			console.log('Twitch Fix!! status code = '+request.status+': '+request.statusText);
		}

	};

	request.send();

}

function showCard(user){

	let name = (user.display_name.length > 2 ? user.display_name : user.login);

	let id = user.id;
	let description = user.description;
	let profPic = user.profile_image_url;

	let card = document.createElement('div');
	card.setAttribute('id', user.display_name);
	card.innerHTML = "<div class='img'><img src='"+profPic+"'/></div><h1>"+name+"</h1><p>"+description+"</p>";
	content.appendChild(card);
	getStreams(id,user.display_name);

}

function getStreams(id,userName){

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
			title = data.title;
			game_id = data.game_id;
			viewers = data.viewer_count;
		}
		console.log('status from within getStreams= '+status);
		updateCard([id,status,thumbnail,title,game_id],userName);
	};

	request.send();

}

function updateCard(data,userName){
	console.log([...arguments]);
	let id = data[0];
	let status = data[1];
	let thumbnail = data[2];
	let title = data[3];
	let game_id = data[4];
	let viewers = data[5];
	var live = (status==='live'? true : false);

	var card = document.getElementById(userName);
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
	getUsers(users);
}

getUsers(users);

document.getElementById("btn-1").addEventListener('click', init);
