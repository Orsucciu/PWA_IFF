const latF = document.querySelector('#lat');
const longF = document.querySelector('#long');
const dateF = document.querySelector('#date');
const videonameF = document.querySelector('#videoname');
const addTechnoForm = document.querySelector('#add-techno-form');

addTechnoForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        lat: latF.value,
        lng: longF.value,
        date: dateF.value,
        resource: videonameF.value,
        unsynced: true
    }

    //9.3 Branchement de notre Bdd Firebase
    fetch('https://pwa-iff-70a4f.firebaseio.com/snaps.json', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            console.log('resp to post to /technos', resp);
        })
        // 9.1 Infrastructure
        .catch(() => {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                console.log('SyncManager supported by browser');
                console.log('we are probably offline');
                navigator.serviceWorker.ready.then(registration => {
                    // put techno in IndexedDB for later syncing
                    return putTechno(payload, payload.id).then(() => {
                        // register a sync with the ServiceWorker
                        return registration.sync.register('sync-technos')
                    });
                })
            } else {
                // TODO browser does NOT support SyncManager: send data to server via ajax
                console.log('SyncManager NOT supported by your browser');
            }
        })
        .then(() => {
            clearForm();
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            latF.value = '';
            longF.value = '';
            dateF.value = '';
            videonameF.value = '';
        }; 
})