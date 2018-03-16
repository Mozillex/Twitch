

var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","stefl1504","IMP_meles"];//,"jessicamak","malukah","DizzyKitten","legendarylea","moushn"];
var streamArr = [];


function twitch(users){
	for (var each in users){
		//let uri = 'https://api.twitch.tv/kraken/streams' + '?' + users[each];
		let uri = 'https://api.twitch.tv/helix/users' + '?login=' + users[each];
		getUser(uri);
	}
	getStreams();
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
			showCard(data);
			let id= String(data.id);
			streamArr.push(id);
		}

		else {
			console.log('Twitch Fix!! status code = '+request.status+': '+request.statusText);
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

function getStreams(){
		console.log(streamArr);
//	console.log(streamArr.join('ff'));

	// let uri = 'https://api.twitch.tv/helix/streams' + '?user_id='+ streamArr.join('&user_id=');
	// let request = new XMLHttpRequest();
	// request.open('get',uri,true);
	// request.dataType = 'json';
	// request.responseType = 'json';
	// request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');
	// request.onerror = function(){
	// 	console.log("oops. stream request failed");
	// };
	//
	// request.onload = function(o){
	// 	if (o.hasOwnProperty('error')){
	// 		console.log('onload error: ' + o.error + o.message);
	// 		return;
	// 	};
	//
	// 	console.log("streams onload succesful. finish the onload function");
	// 	let response2 = this.response;
	// 	//let data = response2.data[0];
	// 	console.log(response2);
	// }
	//
	// request.send();
}

twitch(users);
