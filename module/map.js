let map;
let markers = [];
let bikesAlerte = [];

var greenIcon = L.icon({
  iconUrl: '../src/greenBike.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

var redIcon = L.icon({
  iconUrl: '../src/redBike.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

var purpleIcon = L.icon({
  iconUrl: '../src/purpleBike.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

var warningIcon = L.icon({
  iconUrl: '../src/Warning-mark.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

var orangeIcon = L.icon({
  iconUrl: '../src/orangeBike.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

var Camping = [
  [50.079239, 1.822605],
  [50.079896, 1.822127],
  [50.079981, 1.822355],
  [50.080548, 1.821919],
  [50.080841, 1.821919],
  [50.081363, 1.821585],
  [50.081540, 1.822307],
  [50.079710, 1.823973]
];

function pointInsidePolygon(point, poly) {
  var x = point[0], y = point[1];
  var inside = false;
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    var xi = poly[i][0], yi = poly[i][1];
    var xj = poly[j][0], yj = poly[j][1];

    var intersect = ((yi > y) != (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function updateMarkers() {
  fetch('http://192.168.64.210:3080/Proprietaire')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!map) {
        map = L.map('map').setView([data[0].latitude, data[0].longitude], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var polygon = L.polygon(Camping, {color: 'black'}).addTo(map);
      }

      markers.forEach(marker => {
        map.removeLayer(marker);
      });
      markers = [];

      data.forEach((coord) => {
        let icon = greenIcon;
        let popupText = `Velo Numero : ${coord.VeloID}</br>Nom : ${coord.Nom}</br>Prenom : ${coord.Prenom}`;

        if (coord.IDUser === null || coord.Nom === null || coord.Prenom === null) {
          icon = redIcon;
          popupText = `Velo Numero : ${coord.VeloID}</br>Status : Non Loué`;
        }

        const marker = L.marker([coord.latitude, coord.longitude], { icon: icon }).addTo(map)
          .bindPopup(popupText);

        // Vérifier si le marqueur est à l'intérieur du polygone
        if (pointInsidePolygon([coord.latitude, coord.longitude], Camping)) {
          if (icon === redIcon) {
            icon = orangeIcon;
          }
        }

        // Récupérer l'historique des positions du vélo
        fetch(`http://192.168.64.210:3080/getBikeHistory/${coord.VeloID}`)
          .then((response) => {
            return response.json();
          })
          .then((history) => {
            if (areLastThreePositionsSame(history) && icon === greenIcon) {
              icon = purpleIcon;
            }

            if (areLastTwoPositionsNotSame(history) && icon === redIcon) {
              if (!bikesAlerte.includes(coord.VeloID)) {
                bikesAlerte.push(coord.VeloID);
              }
            }

            if (bikesAlerte.includes(coord.VeloID) && icon === redIcon) {
              icon = warningIcon;
            }

            marker.setIcon(icon);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération de l\'historique des positions du vélo :', error);
          });

        markers.push(marker);
      });

      if (bikesAlerte.length > 0) {
        displayAlertButton();
      } else {
        removeAlertButton();
      }
    })
    .catch((error) => {
      console.error('Error fetching markers:', error);
    });
}

function areLastThreePositionsSame(history) {
  if (history.length < 3) {
    return false;
  }

  let lastPosition = history[history.length - 1];
  let secondLastPosition = history[history.length - 2];
  let thirdLastPosition = history[history.length - 3];

  if (
    lastPosition.latitude === secondLastPosition.latitude &&
    lastPosition.longitude === secondLastPosition.longitude &&
    lastPosition.latitude === thirdLastPosition.latitude &&
    lastPosition.longitude === thirdLastPosition.longitude
  ) {
    return true;
  }

  return false;
}

function areLastTwoPositionsNotSame(history) {
  if (history.length < 2) {
    return false;
  }

  let lastPosition = history[history.length - 1];
  let secondLastPosition = history[history.length - 2];

  if (
    lastPosition.latitude !== secondLastPosition.latitude ||
    lastPosition.longitude !== secondLastPosition.longitude
  ) {
    return true;
  }

  return false;
}

function displayAlertButton() {
  let alertButtonDiv = document.getElementById('alertButtonDiv');
  alertButtonDiv.innerHTML = `
    <button onclick="resetAlerts()">Réinitialiser les alertes</button>
  `;
}

function removeAlertButton() {
  let alertButtonDiv = document.getElementById('alertButtonDiv');
  alertButtonDiv.innerHTML = '';
}

function resetAlerts() {
  bikesAlerte = [];
  markers.forEach(marker => {
    if (marker.options.icon === redIcon) {
      marker.setIcon(warningIcon);
    }
  });
  removeAlertButton();
}

updateMarkers();
setInterval(updateMarkers, 6000);
