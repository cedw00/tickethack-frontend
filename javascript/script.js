let turn = 0;

document.querySelector('#search-trips').addEventListener('click', function () {
	const departure = document.querySelector('#departureInput').value;
    const arrival = document.querySelector('#arrivalInput').value;
    const date = document.querySelector('#dateInput').value;
	let trips = [];

	fetch('https://tickethack-backend-eight-nu.vercel.app/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure: departure, arrival: arrival, date: date }),
	}).then(response => response.json())
	.then(data => {
		if (data.result) {
			turn === 0 ? document.querySelector('#base-img').remove() : turn = 1;
			turn++;
			for (let i = 0; i < data.trips.length; i++) {
				trips.push(data.trips[i]);
				if (Math.floor(((new Date(data.trips[i].date)) - (new Date())) / 60000) > 0) {
					document.querySelector('#result-container').innerHTML +=
				`
				<div class="trip-container" style="background-color: lightgrey; display:flex; justify-content: space-between; width:80%;">
					<p class="trip-desc" style="display:flex;">
						${data.trips[i].departure} > ${data.trips[i].arrival}
						${new Date(data.trips[i].date).getHours() - 1}:${new Date(data.trips[i].date).getMinutes()} 
						${data.trips[i].price}€
					</p>
					<button class="book-trip" style="text-align:center; background-color:rgba(14, 157, 107, 0.76)">Book</button>
				</div>
				`
				}
			}
			for (let i = 0; i < document.querySelectorAll('input').length; i++) {
				document.querySelectorAll('input')[i].value = '';
			}
		} else {
			console.log(document.querySelector('#train').src)
			document.querySelector('#train').src = "./images/notfound.png";
		}})
		.then(allTrips => {
			for (let i = 0; i < document.querySelectorAll('.book-trip').length; i++) {
				document.querySelectorAll('.book-trip')[i].addEventListener('click', function () {
					fetch('https://tickethack-backend-eight-nu.vercel.app/cart', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ departure: trips[i].departure, arrival: trips[i].arrival, date: trips[i].date, price: trips[i].price}),
					}).then(response => response.json()).then(bookedTrip => {
						window.location.assign('./cart.html');
					})
				})
			}
		})
});