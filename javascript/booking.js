let turn = 0;

fetch('https://tickethack-backend-eight-nu.vercel.app/booking').then(response => response.json())
.then(data => {
    if (data.booked) {
        turn === 0 ? document.querySelector('#no-booked').remove() : turn = 1;
		turn++;
        for (let i = 0; i < data.booked.length; i++) {
            document.querySelector('#booked').innerHTML += `
            <div class="booked-trip" style="background-color: lightgrey; display:flex; justify-content: space-between; width: 100%">
                <p class="trip-desc">
                    ${data.booked[i].departure} > ${data.booked[i].arrival}
                    ${new Date(data.booked[i].date).getHours() - 1}:${new Date(data.booked[i].date).getMinutes()} 
                    ${data.booked[i].price}€
                </p>
                <p>Departure in ${Math.floor(((new Date(data.booked[i].date)) - (new Date())) / (1000 * 60 * 60))} hours</p>
            </div>
        `;
        }
    }
})