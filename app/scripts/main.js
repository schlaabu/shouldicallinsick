let x = 0;
let map, service, position;
let sick = [
  {'level':1,'search':'Park','searchType':'park','title':'Totally faking'},
  {'level':2,'search':'Pub','searchType':'bar','title':'A little hungover'},
  {'level':3,'search':'Movie Theater','searchType':'movie_theater','title':'Sort of stuffed up'},
  {'level':4,'search':'Pub','searchType':'bar','title':'A lot hungover'},
  {'level':5,'search':'Spa','searchType':'spa','title':'Crappy'},
  {'level':6,'search':'Pharmacy','searchType':'pharmacy','title':'Pretty gross'},
  {'level':7,'search':'Clinic','searchType':'doctor','title':'Truly disgusting'},
  {'level':8,'search':'Clinic','searchType':'doctor','title':'Probably dying'},
  {'level':9,'search':'Hospital','searchType':'hospital','title':'Patient Zero'},
  {'level':10,'search':'Hospital','searchType':'hospital','title':'Actually dying'},
  {'level':11,'search':'Taxi','title':''}
]; //sick
let verdict = [
  {'answer':'No','description': 'That\'s probably not a good idea. Sorry. Go now. Go off to your thing. Go. Shoo. Deal with it. No. Stop making that face.'},
  {'answer':'Nyet','description': 'Work isn\'t "naturally productive". Both in the sense that it takes work to make work productive, and that productive work depends on tools and techniques to be productive. Unfortunately, today you are that tool.'},
  {'answer':'Nah','description': 'We can evade reality, but we can\'t evade the consequences of evading reality. Now let\'s brush those teeth and get you off to the pain factory.'},
  {'answer':'Nope','description': 'C\'mon, you can do it. Just put your pants or whatever on and get the bacon. Unless of course you\'re a vegetarian&#8212;you can go make that cheddar. And if you\'re a vegan, you don\'t really have any other choice than to obtain the cabbage. Sorry.'},
  {'answer':'Negative','description': 'Go to work already. Why are you asking a dad joke website? You couldn\'t be that sick. Are you depressed? When was the last time you had a salad?'},
  {'answer':'Do it','description': 'Screw it. What is anything anyway? Like, you could just be just walking down the street someday and BAM. Dead from having to pee.'},
  {'answer':'Might as well','description': 'If you think about it, not going actually helps your career. You\'re creating a buzz. You\'re sahking things up. You\'re living the dream.'},
  {'answer':'Probably','description': 'You wouldnt want to barf on anybody. Nowadays that\'s probably assault. Maybe even sexual assault. Look out.'},
  {'answer':'Yep','description': 'Definitely. You look terrible and kind of smell like, what is it? Is that yogurt? You smell like yogurt.'},
  {'answer':'YES','description': 'WTF CALL AN AMBULANCE. HOW ARE YOU BROWSING THE INTERNET RIGHT NOW?'},
]; //verdict
ribbonText = () => {
  let thisDate = new Date();
  let todayDay = thisDate.getDay();
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let today = days[todayDay];
  let ribbonOptions = [`You don't look so good`,`Where does it hurt?`,`We care`,`Who works on a ${today}?!`];
  let ribbonContainer = document.querySelector('.ribbon');
  let ribbonRandom = Math.floor(Math.random() * ribbonOptions.length);
  ribbonContainer.innerHTML = ribbonOptions[ribbonRandom];
  howSick();
}; //ribbonText
howSick = () => {
  let meterContainer = document.querySelector('.sick-meter');
  let sickMeter = `<p align='center'>So how sick are you <em>really?</em></p>
               <div class='left'></div><h1 class='meter-digit'></h1><div class='right'></div>
               <h2 class='meter-desc'></h2>`;
  let sickButton = `<button class='sick-button should-i' onclick='shouldI()'>Well, Should I?!</button>`;
  meterContainer.innerHTML = sickMeter + sickButton;
  picker();
}; //howSick
picker = () => {
  let left = document.querySelector('.left');
  let right = document.querySelector('.right');
  let digit = document.querySelector('.meter-digit');
  let desc = document.querySelector('.meter-desc');
  digit.innerHTML = sick[0].level;
  desc.innerHTML = sick[0].title;
  left.onclick = () => {
    if (x > 0) {
      --x;
      digit.innerHTML = sick[x].level;
      desc.innerHTML = sick[x].title;
    }
  };
  right.onclick = () => {
    if (x < 9) {
      x++;
      digit.innerHTML = sick[x].level;
      desc.innerHTML = sick[x].title;
    }
  };
}; //picker
shouldI = () => {
  introText = document.querySelector('.intro-text');
  introText.innerHTML = '';
  let verdictContainer = document.querySelector('.sick-meter');
  let y = 0;
  let secondOpinion = `<button class='sick-button verdict-buttons' onclick='location.reload()'>Get a Second Opinion</button>`;
  switch(sick[x].level) {
    case sick[0].level:
    case sick[1].level:
      y = Math.floor(Math.random() * 6);
      if (y < 5) {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sick[10].search}</button>`;
        x = 10;
      } else {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sick[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdict[y].answer}</h2><p>${verdict[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sick[2].level:
    case sick[3].level:
    case sick[4].level:
      y = Math.floor(Math.random() * (8-2) + 2);
      if (y < 5) {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sick[10].search}</button>`;
        x = 10;
      } else {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sick[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdict[y].answer}</h2><p>${verdict[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sick[5].level:
    case sick[6].level:
    case sick[7].level:
      y = Math.floor(Math.random() * (9-4) + 4);
      if (y < 5) {
        serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sick[10].search}</button>`;
        x = 10;
      } else {
        serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sick[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdict[y].answer}</h2><p>${verdict[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sick[8].level:
    case sick[9].level:
      y = Math.floor(Math.random() * (10-8) + 8);
      serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sick[x].search}</button>`;
      verdictContainer.innerHTML = `<h2>${verdict[y].answer}</h2><p>${verdict[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
  } //switch
}; //shouldI
getLocation = () => {
  let findButton = document.querySelector('.find-button');
  let sickResults = document.querySelector('.search-results');
  function success(position,data) {
    myLocation = [position.coords.latitude,position.coords.longitude];
    let latlng  = {lat: position.coords.latitude, lng: position.coords.longitude};
    map = new google.maps.Map(document.querySelector('.search-results'),);
    let request = {
      location: latlng,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: sick[x].search,
      type: [sick[x].searchType]
    }; // request
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,callback);
    function callback(results,status) {
      let data = '';
      i = 0;
      result = results;
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i=0;i<result.length; i++) {
          let locationName = result[i].name;
          let address = result[i].vicinity;
          let addressSplit = address.split(", ");
          streetAddress = addressSplit[0];
          cityAddress = addressSplit[1];
          if (typeof streetAddress == 'undefined') {
            streetAddress = "No address details available";

          }
          if (typeof cityAddress == 'undefined') {
            cityAddress = "No address details available";

          }
          data += `<li>
                      <div class='detail'>
                        <h3>${locationName}</h3>
                        <p>${streetAddress}</p>
                        <p>${cityAddress}</p>
                        <p class="distance"></p>
                        <p>${starRating(i)}</p>
                        <div class='more-details'></div>
                      </div>
                      <div class='detail-right'>
                        <button onclick='moreDetails(${i})'>More Details</button>
                      </div>
                    </li>`;
          locationDistance(i);
        }; // for
      } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        data += `<li><div class='detail'><h3><a>Shucks</a></h3><p>Sans dice, friend. Go to bed.</p></div></li>`;
      }// if
      sickResults.innerHTML = `<ul class='sick-results'>${data}</ul>`;
    }; //callback
  findButton.outerHTML = "";
  }; //success
  error = () => {
    console.log("fail");
  }; //error
  navigator.geolocation.getCurrentPosition(success, error);
  sickResults.innerHTML = `<h1 align='center' style='opacity: 100;'>Loading...</h1>`;
}; //getLocation
locationDistance = (i) => {
  let placeLocation = result[i].geometry.location;
  let origin = new google.maps.LatLng(myLocation[0], myLocation[1]);
  let destination = placeLocation;
  locService = new google.maps.DistanceMatrixService();
  locService.getDistanceMatrix(
    { origins: [origin],
      destinations: [destination],
      travelMode: 'WALKING',
    }, callback);
  function callback(response) {
    let distanceContainer = document.querySelectorAll('.distance');
    distance = response.rows[0].elements[0].distance.text;
    distanceContainer[i].innerHTML = distance + " away";
  }; //callback
}; //locationDistance
starRating = (i) => {
  let rating = result[i].rating;
  let starWidth = 20;
  let starPosition = 0;
  let starTag = '';
  let starData = '';
  starWidth = starWidth * Math.floor(rating);
  for (let star = 0; star < Math.floor(rating); star++) {
    starData += `<path id="svg" d="m${starPosition},8.04244l5.72953,0l1.77047,-5.44303l1.77047,5.44303l5.72953,0l-4.63528,3.36394l1.77056,5.44303l-4.63528,-3.36403l-4.63528,3.36403l1.77056,-5.44303l-4.63528,-3.36394z" fill="#f1c40f"/>`;
    starPosition = starPosition + 20;
  }; //for
  if (rating % 1 != 0) {
    starWidth = starWidth + 10;
    starData += `<path id="svg" d="m${starPosition},8.28069l5.85673,0l1.80977,-5.56387l0,11.12764l-4.73818,3.43871l1.80987,-5.56386l-4.73819,-3.43862z" fill="#f1c40f"/>`;
    starData += `</svg>`;
  } //if
  starTag = `<svg role="img" width="${starWidth}" height="20" xmlns="http://www.w3.org/2000/svg">
            <title>Rating: ${rating}</title>`;
  if (typeof rating == 'undefined') {
    starTag = ``;
    starData = `no rating available`;
  } //if
  let stars = starTag + starData;
  return stars;
}; //starRating
moreDetails = (i) => {
  let detailsContainer = document.querySelectorAll('.more-details');
  let detailsButton = document.querySelectorAll('.detail-right');
  let request = { placeId: result[i].place_id }; // request
  service.getDetails(request, function(details) {
    if (typeof details.website !== 'undefined') {
      splitUrl = details.website.split('/');
      formattedUrl = `<a href='${details.website}'>${splitUrl[2]}</a>`;
    } else {
      details.website = "/#";
      formattedUrl = "No website available";
    };
    if (typeof details.formatted_phone_number == 'undefined') {
      details.formatted_phone_number = "No phone number available";
    };
    detailsContainer[i].innerHTML = `<p>${details.formatted_phone_number}<br>${formattedUrl}</p>`;
    detailsButton[i].innerHTML = '';
  }); //getDetails
}; //moreDetails
window.onload = ribbonText;