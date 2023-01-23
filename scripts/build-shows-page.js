var shows = [];

window.onload = async () => {
	data = await getShowdates();

	shows = data.map((show) => {
		let date = new Date(show.date);
		return {
			date: date.toDateString(),
			venue: show.place,
			loc: show.location,
		};
	});
	renderShows();
};

function renderShows() {
	let showsDiv = document.getElementById("shows");

	shows.forEach((show) => {
		let row = document.createElement("div");
		row.classList.add("shows__row");

		//just add each property because we're using nth child css
		Object.getOwnPropertyNames(show).forEach((prop) => {
			let div = document.createElement("div");
			let p = document.createElement("p");
			p.innerText = show[prop];
			div.appendChild(p);
			row.appendChild(div);
		});

		//create the buy tickets button
		let button = document.createElement("button");
		button.classList.add("shows__button");
		button.innerText = "Buy Tickets";
		row.appendChild(button);

		//add the event listener for row selection
		row.addEventListener("click", select);

		showsDiv.appendChild(row);
	});
}

function select(e) {
	if (!e.currentTarget.classList.contains("shows__row--selected")) {
		let hits = document.querySelectorAll(".shows__row--selected");
		if (hits.length > 0) {
			hits.forEach((hit) => {
				hit.classList.remove("shows__row--selected");
			});
		}
		e.currentTarget.classList.add("shows__row--selected");
	}
}
