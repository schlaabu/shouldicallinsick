let sicknessLevels = require('./data/sickness_levels');
let verdicts = require('./data/verdicts');
let x = 0;
let map, myLocation, position, result, service;
let ribbonText = () => {
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

let howSick = () => {
  let sickMeterTemplate = require('../templates/sick_meter.dot');
  document.querySelector('.sick-meter').innerHTML = sickMeterTemplate();
  picker();
}; //howSick

let picker = () => {
  let left = document.querySelector('.left');
  let right = document.querySelector('.right');
  let digit = document.querySelector('.meter-digit');
  let desc = document.querySelector('.meter-desc');
  digit.innerHTML = sicknessLevels[0].level;
  desc.innerHTML = sicknessLevels[0].title;
  left.onclick = () => {
    if (x > 0) {
      --x;
      digit.innerHTML = sicknessLevels[x].level;
      desc.innerHTML = sicknessLevels[x].title;
    }
  };
  right.onclick = () => {
    if (x < 9) {
      x++;
      digit.innerHTML = sicknessLevels[x].level;
      desc.innerHTML = sicknessLevels[x].title;
    }
  };
}; //picker

window.shouldI = () => {
  let introText = document.querySelector('.intro-text');
  introText.innerHTML = '';
  let verdictContainer = document.querySelector('.sick-meter');
  let y = 0;
  let secondOpinion = `<button class='sick-button verdict-buttons' onclick='location.reload()'>Get a Second Opinion</button>`;
  switch(sicknessLevels[x].level) {
    case sicknessLevels[0].level:
    case sicknessLevels[1].level:
      y = Math.floor(Math.random() * 6);
      if (y < 5) {
        var serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sicknessLevels[10].search}</button>`;
        x = 10;
      } else {
        var serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sicknessLevels[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdicts[y].answer}</h2><p>${verdicts[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sicknessLevels[2].level:
    case sicknessLevels[3].level:
    case sicknessLevels[4].level:
      y = Math.floor(Math.random() * (8-2) + 2);
      if (y < 5) {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sicknessLevels[10].search}</button>`;
        x = 10;
      } else {
        serviceButton = `<button class='sick-button verdict-buttons find-button' onclick='getLocation()'>Find a ${sicknessLevels[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdicts[y].answer}</h2><p>${verdicts[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sicknessLevels[5].level:
    case sicknessLevels[6].level:
    case sicknessLevels[7].level:
      y = Math.floor(Math.random() * (9-4) + 4);
      if (y < 5) {
        serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sicknessLevels[10].search}</button>`;
        x = 10;
      } else {
        serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sicknessLevels[x].search}</button>`;
      };
      verdictContainer.innerHTML = `<h2>${verdicts[y].answer}</h2><p>${verdicts[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
    case sicknessLevels[8].level:
    case sicknessLevels[9].level:
      y = Math.floor(Math.random() * (10-8) + 8);
      serviceButton = `<button class='sick-button find-button' style='opacity:100;' onclick='getLocation()'>Find a ${sicknessLevels[x].search}</button>`;
      verdictContainer.innerHTML = `<h2>${verdicts[y].answer}</h2><p>${verdicts[y].description}</p><div class='button-container'>${serviceButton} ${secondOpinion}</div>`;
      break;
  } //switch
}; //shouldI

window.getLocation = () => {
  let findButton = document.querySelector('.find-button');
  let sickResults = document.querySelector('.search-results');
  function success(position,data) {
    myLocation = [position.coords.latitude,position.coords.longitude];
    let latlng  = {lat: position.coords.latitude, lng: position.coords.longitude};
    let map = new google.maps.Map(document.querySelector('.search-results'),);
    let request = {
      location: latlng,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: sicknessLevels[x].search,
      type: [sicknessLevels[x].searchType]
    }; // request
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,callback);
    function callback(results,status) {
      let Location = require('./google_maps/location');
      let locationList = require('../templates/location_list.dot');
      let locations = results.map((r) => new Location(r)); 
      sickResults.innerHTML = locationList({ locations, myLocation });
      result = results;
      //locationDistance();
    }; //callback
  findButton.outerHTML = "";
  }; //success
  let error = () => {
    console.log("fail");
  }; //error
  navigator.geolocation.getCurrentPosition(success, error);
  sickResults.innerHTML = `<h1 align='center'>Loading...</h1>`;
}; //getLocation

window.moreDetails = (i) => {
  let detailsContainer = document.querySelectorAll('.more-details');
  let detailsButton = document.querySelectorAll('.detail-right');
  let request = { placeId: result[i].place_id }; // request
  service.getDetails(request, function(details) {
    if (typeof details.website !== 'undefined') {
      let splitUrl = details.website.split('/');
      var formattedUrl = `<a href='${details.website}'>${splitUrl[2]}</a>`;
    } else {
      details.website = "/#";
      var formattedUrl = "No website available";
    };
    if (typeof details.formatted_phone_number == 'undefined') {
      details.formatted_phone_number = "No phone number available";
    };
    detailsContainer[i].innerHTML = `<p>${details.formatted_phone_number}<br>${formattedUrl}</p>`;
    detailsButton[i].innerHTML = '';
  }); //getDetails
}; //moreDetails

window.onload = ribbonText;
