

var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","stefl1504","IMP_meles","jessicamak","malukah","DizzyKitten","legendarylea","moushn"];

function twitch(users){
	for (var each in users){
		//let uri = 'https://api.twitch.tv/kraken/streams' + '?' + users[each];
		let uri = 'https://api.twitch.tv/helix/users' + '?login=' + users[each];
		callAPI(uri);
	}
}

function callAPI(u){
	let uri = u;
	let request = new XMLHttpRequest();
	request.open('GET',uri,true);
	request.dataType = 'json';
	request.responseType = 'json';
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');

	request.onerror = function(){
		console.log("error");
	};


	request.onload = function(){

		if (request.status !== 200){
		 	console.log('Twitch Fix!! status code = '+request.response.status);
		}

		else {
			let response = request.response;
			let data = response.data[0];
			showCard(data);
		}

	};

	request.send();

}
function showCard(user){
	let name = user.display_name;
	if (!name){
		name = user.login;
	};
	let id = user.id;
	let description = user.description;
	let profPic = user.profile_image_url;

	let card = document.createElement('div');
	card.innerHTML = "<img src='"+profPic+"'/><h1>"+name+"</h1><p>"+description+"</p>";
	document.getElementById("content").appendChild(card);


}
twitch(users);
