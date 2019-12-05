/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

var theMarker = {}; //this holds the user's marker

function loadSnaps() {
    //fetch('http://localhost:3001/snaps')
    //fetch('https://raw.githubusercontent.com/Orsucciu/PWA_IFF/master/db.json')
    fetch('https://pwa-iff-70a4f.firebaseio.com/snaps.json')
        .then(response => {
            response.json()
                .then(snaps => {
                    
                    snaps.map(t => L.marker( [t.lat, t.lng] )
                    .bindPopup( `<div><p>Snap aghjunghjatu u ${new Date(t.date) }</p></div><video style="width: 100%;" controls><source src="/resources/${t.resource}" type="video/mp4">Your browser does not support the video tag.</video>` )
                    .addTo( map ));

                });
        })
        .catch(console.error);
}

function setUserMap() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  }//function that retrieves the position
  function showPosition(position) {
    var location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    map.removeLayer(theMarker); //we remove the user's position

    map.flyTo(new L.LatLng(location.latitude, location.longitude), 18);

    theMarker = L.marker( [location.latitude, location.longitude] ).addTo( map );//we set it again

    console.log(location)
}//request for location

function locationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable."
            break;
        case error.TIMEOUT:
            return "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred."
            break;
    }
}

function extractKeysFromArrayBuffer(subscription){
    // no more keys proprety directly visible on the subscription objet. So you have to use getKey()
    const keyArrayBuffer = subscription.getKey('p256dh');
    const authArrayBuffer = subscription.getKey('auth');
    const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(keyArrayBuffer)));
    const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(authArrayBuffer)));
    console.log('p256dh key', keyArrayBuffer, p256dh);
    console.log('auth key', authArrayBuffer, auth);
    
    // Paramètres nécessaires à l'objet de notification pushSubscription
    console.log('endpoint :');
    console.dir(subscription.endpoint);
    console.log('p256dh key :', p256dh);
    console.log('auth key :', auth);
}