import axios from '../../node_modules/axios/index';

const form = document.querySelector('form')!;
const address = document.getElementById('address')! as HTMLInputElement;
// const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${user_entered_address}&key=${GOOGLE_API_KEY}`
type GEOCODING_Pattern_RESPONSE = {
    results: { geometry: { location: { lat: number, lng: number } } }[]
    status: 'OK' | 'ZERO_RESULTS';
};
//declare var google: any;
function searchAddressHandler(event: Event) {
    event.preventDefault();
    const user_entered_address = address.value;
    axios.get<GEOCODING_Pattern_RESPONSE>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(user_entered_address)}&key=${GOOGLE_API_KEY}`).then((response) => {
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 8
        });
        new google.maps.Marker({ position: coordinates, map: map });
        // const latitude = coordinates.lat;
        // const longitude = coordinates.lng;
        if (response.data.status !== 'OK') {
            throw new Error('could not fetch location !!');
        }
        console.log(response);
    }).catch((error) => { alert(error.message); console.log(error); });
}
form.addEventListener('submit', searchAddressHandler);

