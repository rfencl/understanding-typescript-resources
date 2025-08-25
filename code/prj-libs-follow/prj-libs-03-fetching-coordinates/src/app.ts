import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyDvKp8PalcNnPYrMbUqXElDtXxiBOthsgA";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};


function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      console.log(response.data);
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 9,
        mapId: "8b1e3f4b0c4d9f2d", // Optional: Use your own map ID if you have one
      });
      new google.maps.marker.AdvancedMarkerElement({
        position: coordinates,
        map: map,
      });
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
