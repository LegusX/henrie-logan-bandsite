var shows = [
	{
		date: "Mon Sept 06 2021",
		venue: "Ronald Lane",
		loc: "San Francisco, CA",
	},
	{
		date: "Tue Sept 21 2021",
		venue: "Pier 3 East",
		loc: "San Francisco, CA ",
	},
	{
		date: "Fri Oct 15 2021 ",
		venue: "View Lounge ",
		loc: "San Francisco, CA ",
	},
	{
		date: "Sat Nov 06 2021",
		venue: "Hyatt Agency ",
		loc: "San Francisco, CA ",
	},
	{
		date: "Fri Nov 26 2021",
		venue: "Moscow Center",
		loc: "San Francisco, CA ",
	},
	{
		date: "Wed Dec 15 2021",
		venue: "Press Club",
		loc: "San Francisco, CA ",
	},
];

window.onload = renderShows;

function renderShows() {
	let showsDiv = document.getElementById("shows");

	shows.forEach((show) => {
		let row = document.createElement("div");
		row.classList.add("shows__row");

		Object.getOwnPropertyNames(show).forEach((prop) => {
			let div = document.createElement("div");
			let p = document.createElement("p");
			p.innerText = show[prop];
			div.appendChild(p);
			row.appendChild(div);
		});

		let button = document.createElement("button");
		button.classList.add("shows__button");
		button.innerText = "Buy Tickets";
		row.appendChild(button);

		showsDiv.appendChild(row);
		showsDiv.appendChild(document.createElement("hr"));
	});
}
