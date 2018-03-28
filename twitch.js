
function twitch(get,params){

   if (get==='users'){

   	for (var each in users){
   		let uri = 'https://api.twitch.tv/helix/users' + '?login=' + users[each];
   		getUser(uri);
   	}
   }
   else if (get==='streams'){

   }

   else return alert('error in type of twitch call');

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
