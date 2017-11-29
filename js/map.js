'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarMapPinElement = map.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarArticleTemplate = document.querySelector('template').content.querySelector('.map__card');
var ads = [];
var adsCount = 8;
var minPrice = 1000;
var maxPrice = 1000000;
var roomsCount = 5;
var guestsCount = 10;
var pinHalfWidth = 20;
var pinHeight = 62;
var minX = 300 + pinHalfWidth;
var maxX = 900 - pinHalfWidth;
var minY = 100 + pinHeight;
var maxY = 500 - pinHeight;

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'flat',
  'house',
  'bungalo'
];

var checkinTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// получение пути к файлу с аватаркой
var getAvatarPath = function (userNumber) {
  var avatarPath = '';
  if (userNumber < 10) {
    avatarPath = 'img/avatars/user0' + userNumber + '.png';
  } else {
    avatarPath = 'img/avatars/user' + userNumber + '.png';
  }
  return avatarPath;
};

// получение author.avatar
var getAvatar = function (number) {
  var avatars = [];
  avatars[number] = getAvatarPath(number + 1);
  return avatars[number];
};

// получение ad.author
var getAuthor = function (number) {
  var author = {};
  author.avatar = getAvatar(number);
  return author;
};

// получение случайного заголовка из массива
var getRandomTitle = function () {
  var randomTitle = titles[Math.floor(Math.random() * titles.length)];
  return randomTitle;
};

// получение случайной характеристики из массива
var getRandomFeatureItem = function () {
  var randomFeatureItem = featuresList[Math.floor(Math.random() * featuresList.length)];
  return randomFeatureItem;
};

// получение случайной длины массива характеристик
var getRandomFeaturesLength = function () {
  var randomFeaturesLength = Math.ceil(Math.random() * featuresList.length);
  return randomFeaturesLength;
};

// получение случайного x
var getX = function (min, max) {
  var x = Math.floor(Math.random() * (max - min) + min);
  return x;
};

// получение случайного y
var getY = function (min, max) {
  var y = Math.floor(Math.random() * (max - min) + min);
  return y;
};

// получение случайной координаты
var getRandomLocation = function () {
  var randomLocation = {};
  randomLocation.x = getX(minX, maxX);
  randomLocation.y = getY(minY, maxY);
  return randomLocation;
};

// получение массива случайных координат
var getLocations = function (count) {
  var locations = [];
  var location;
  for (var i = 0; locations.length < count; i++) {
    location = getRandomLocation();
    locations[i] = location;
  }
  return locations;
};

// вызов массива случайных координат
var tempLocations = getLocations(adsCount);

// получение offer.title
var getTitle = function (number) {
  var tempTitles = [];
  var tempTitle;
  for (var i = 0; tempTitles.length !== titles.length; i++) {
    tempTitle = getRandomTitle();
    if (tempTitles.indexOf(tempTitle) === -1) {
      tempTitles[i] = tempTitle;
    } else {
      i -= 1;
    }
  }
  return tempTitles[number];
};

// получение offer.price
var getPrice = function (min, max) {
  var price = Math.floor(Math.random() * (max - min) + min);
  return price;
};

// получение offer.type
var getType = function () {
  var type = types[Math.floor(Math.random() * types.length)];
  return type;
};

// получение offer.rooms
var getRooms = function (count) {
  var rooms = Math.ceil(Math.random() * count);
  return rooms;
};

// получение offer.guests
var getGuests = function (count) {
  var guests = Math.ceil(Math.random() * count);
  return guests;
};

// получение offer.checkin
var getCheckin = function () {
  var checkin = checkinTimes[Math.floor(Math.random() * checkinTimes.length)];
  return checkin;
};

// получение offer.checkout
var getcheckout = function () {
  var checkout = checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)];
  return checkout;
};

// получение offer.features
var getFeatures = function () {
  var tempFeatures = [];
  var features = [];
  tempFeatures.length = getRandomFeaturesLength();
  var feature;
  for (var i = 0; features.length !== tempFeatures.length; i++) {
    feature = getRandomFeatureItem();
    if (features.indexOf(feature) === -1) {
      features[i] = feature;
    } else {
      i -= 1;
    }
  }
  return features;
};

// получение offer
var getOffer = function (number) {
  var offer = {};
  offer.title = getTitle(number);
  offer.address = String(tempLocations[number].x) + ', ' + String(tempLocations[number].y);
  offer.price = getPrice(minPrice, maxPrice);
  offer.type = getType();
  offer.rooms = getRooms(roomsCount);
  offer.guests = getGuests(guestsCount);
  offer.checkin = getCheckin();
  offer.checkout = getcheckout();
  offer.features = getFeatures();
  offer.description = '';
  offer.photos = [];
  return offer;
};

// создание объявления
var getAd = function (number) {
  var ad = {};
  ad.author = getAuthor(number);
  ad.offer = getOffer(number);
  ad.location = tempLocations[number];
  return ad;
};

// получение массива объявлений
var getAds = function (count) {
  for (var i = 0; i < count; i++) {
    ads[i] = getAd(i, count);
  }
  return ads;
};
getAds(adsCount);

var renderMapPin = function (ad) {
  var mapPinElement = similarMapPinTemplate.cloneNode(true);
  mapPinElement.style.top = ad.location.y + 'px';
  mapPinElement.style.left = ad.location.x + 'px';
  mapPinElement.querySelector('img').src = ad.author.avatar;
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderMapPin(ads[i]));
}

similarMapPinElement.appendChild(fragment);

var popup = similarArticleTemplate.querySelector('.popup__features');
while (popup.firstChild) {
  popup.removeChild(popup.firstChild);
}

var renderArticle = function (adNumber) {
  var article = similarArticleTemplate.cloneNode(true);
  article.querySelector('h3').textContent = adNumber.offer.title;
  article.querySelector('small').textContent = adNumber.offer.address;
  article.querySelector('.popup__price').textContent = adNumber.offer.price + String.fromCharCode(8381) + '/ночь';
  if (adNumber.offer.type === 'flat') {
    article.querySelector('h4').textContent = 'Квартира';
  } else if (adNumber.offer.type === 'house') {
    article.querySelector('h4').textContent = 'Дом';
  } else {
    article.querySelector('h4').textContent = 'Бунгало';
  }
  article.querySelector('h4 + p').textContent = adNumber.offer.rooms + ' для ' + adNumber.offer.guests + ' гостей';
  article.querySelector('h4 + p + p').textContent = 'Заезд после ' + adNumber.offer.checkin + ', выезд до ' + adNumber.offer.checkout;
  for (var i = 0; i < adNumber.offer.features.length; i++) {
    var item = document.createElement('li');
    item.className = 'feature';
    item.classList.add('feature--' + adNumber.offer.features[i]);
    fragment.appendChild(item);
    article.querySelector('.popup__features').appendChild(fragment);
  }
  article.querySelector('.popup__features + p').textContent = adNumber.offer.description;
  article.querySelector('.popup__avatar').src = adNumber.author.avatar;
  return article;
};

fragment.appendChild(renderArticle(ads[0]));
map.appendChild(fragment);