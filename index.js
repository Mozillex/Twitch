

var users = ["ESL_SC2","Monstercat","Viliciousness","freecodecamp","stefl1504","IMP_meles","jessicamak","malukah","DizzyKitten","legendarylea","moushn","zanb_tv"];

function twitch(users){
	for (var each in users){
			let uri = 'https://wind-bow.glitch.me/twitch-api/channels/'+each;
			callAPI(uri);
		}
	
//	let str = this.endpoint +'?'+ arr.join('&');
//	return encodeURI(str);
}


function callAPI(u){
	let uri = u;
	let request = new XMLHttpRequest();
	request.open('GET',uri,true);
	request.dataType = 'JSON';
	request.onerror = function(){
		console.log(request.error);
	};
	request.send();
	
	request.onload = function(){
		response = request.response;
		console.log('response = '+response);//build(request.response);
	};
}
function build(x){
	console.log('build= '+this.response);
}
twitch(users);
