let total = 0;

function displayCart() {
	fetch('http://localhost:3000/cart')
	.then(response => response.json())
	.then(data => {
		if (data.booked) {
			for (let i = 0; i < data.booked.length; i++) {
				total += data.booked[i].price;
				document.querySelector('#booked').innerHTML += `
                <div class="booked-trip" style="background-color: lightgrey; display:flex; justify-content: space-between; width: 100%">
					<p class="trip-desc">
						${data.booked[i].departure} > ${data.booked[i].arrival}
						${new Date(data.booked[i].date).getHours() - 1}:${new Date(data.booked[i].date).getMinutes()} 
						${data.booked[i].price}€
					</p>
					<button class="delete" style="text-align:center; background-color:darkcyan">X</button>
				</div>
			`;
			}
		}
		document.querySelector('#total').textContent = total;
		deleteBookedTrip();
	})
}

function deleteBookedTrip() {
	for (let i = 0; i < document.querySelectorAll('.delete').length; i++) {
		document.querySelectorAll('.delete')[i].addEventListener('click', async function () {
            await fetch('http://localhost:3000/cart').then(response => response.json()).then(data => {
                if (data.booked.length !== 0) {
					total -= data.booked[i].price;
                    fetch(`http://localhost:3000/cart/`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
		                body: JSON.stringify({
                            departure: data.booked[i].departure,
                            arrival: data.booked[i].arrival,
                            date: data.booked[i].date,
                            price: data.booked[i].price,
                        }),
                    }).then(response => response.json())
					.then(data => {
						if (data.result) {
							this.parentNode.remove();
						}
					})
				}
			});
			document.querySelector('#total').textContent = total;
		})
	}
}

displayCart();

document.querySelector('#purshase-btn').addEventListener('click', function () {
	for (let i = 0; i < document.querySelectorAll('.booked-trip').length; i++) {
		document.querySelectorAll('.booked-trip')[i].remove();
	}
	window.location.assign('./booking.html');
})