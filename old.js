//let bootstrap = require('bootstrap');

var userID = '0123456';
var userLogin="money";
var gameType = 'live';//could also be 'all'or 'vodcast'


var TESTcall = 'topClips';//['active','users'];


var twitch = {

	topClips : {
		endpoint : 'https://api.twitch.tv/kraken/clips/top',
		params : {
			limit : 20,
			game : 'Overwatch',
			trending : true
		}
	},

	test : {
		endpoint : 'https://api.twitch.tv/kraken/streams/freecodecamp',
		params : {
			type : 'live',
			first : 20
		}
	},

	active : {
		endpoint : 'https://api.twitch.tv/helix/streams',
		params : {
			type : 'live',
			first : 20
		}
	},

	users	: {
		endpoint : 'https://api.twitch.tv/helix/users',
		params : {

		}
	},

	uri : function(o){
		let arr = [];
		let params = this[o].params;

		for (var key in params){
			arr.push(key + '=' + params[key]);
		}

		let str = this[o].endpoint +'?'+ arr.join('&');
		return encodeURI(str);
	}

};
var data;
function twitchAPI(option){
	let uri = twitch.uri(option);
	let request = new XMLHttpRequest();
	request.open('GET',uri,true);// + ((/\?/).test(uri) ? "&" : "?") + (new Date()).getTime());
	request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');
	request.onerror = function(){
		console.log(request.error);
	};
	request.send();
	let response = request.response;
	let clips = response.clips;
	let trial = clips[]
	request.onload = console.log('clips = '+clips);//build(request.response);
}

function build(x){
	console.log(x);
}
twitchAPI(TESTcall);
