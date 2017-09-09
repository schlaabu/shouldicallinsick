const NO_ADDRESS = 'No address details available'
const NO_CITY = 'No address details available'

module.exports = class Location {
  constructor(data) {
    this.name = data.name;
    [this.street, this.cityName] = data.vicinity.split(', ');
    this.rating = data.rating;
  }

  get address() {
    return this.street || NO_ADDRESS;
  }

  get city() {
    return this.cityName || NO_CITY;
  }

  get starRating () {
    let starWidth = 20;
    let starPosition = 0;
    let starTag = '';
    let starData = '';
    starWidth = starWidth * Math.floor(this.rating);
    for (let star = 0; star < Math.floor(this.rating); star++) {
      starData += `<path id="svg" d="m${starPosition},8.04244l5.72953,0l1.77047,-5.44303l1.77047,5.44303l5.72953,0l-4.63528,3.36394l1.77056,5.44303l-4.63528,-3.36403l-4.63528,3.36403l1.77056,-5.44303l-4.63528,-3.36394z" fill="#f1c40f"/>`;
      starPosition = starPosition + 20;
    }; //for
    if (this.rating % 1 != 0) {
      starWidth = starWidth + 10;
      starData += `<path id="svg" d="m${starPosition},8.28069l5.85673,0l1.80977,-5.56387l0,11.12764l-4.73818,3.43871l1.80987,-5.56386l-4.73819,-3.43862z" fill="#f1c40f"/>`;
      starData += `</svg>`;
    } //if
    starTag = `<svg role="img" height="20" xmlns="http://www.w3.org/2000/svg">
              <title>Rating: ${this.rating}</title>`;
    if (typeof this.rating == 'undefined') {
      starTag = ``;
      starData = `no rating available`;
    } //if
    let stars = starTag + starData;
    return stars;
  };
}
