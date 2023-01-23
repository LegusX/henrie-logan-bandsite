var comments = [
	{
		name: "Connor Walton",
		text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
		time: 1613538000000,
	},
	{
		name: "Emilie Beach",
		text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
		time: 1610168400000,
	},
	{
		name: "Miles Acosta",
		text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
		time: 1608440400000,
	},
];

window.onload = async () => {
	const name = document.getElementById("name");
	const text = document.getElementById("comment");
	const submit = document.getElementById("submit");

	submit.addEventListener("click", async (e) => {
		e.preventDefault();

		//form validation
		let error = false;
		if (name.value.length === 0) {
			if (!name.classList.contains("commentForm__input--error")) {
				name.classList.add("commentForm__input--error");
			}
			error = true;
		}
		if (text.value.length === 0) {
			if (!text.classList.contains("commentForm__input--error")) {
				text.classList.add("commentForm__input--error");
			}
			error = true;
		}
		//if any field was empty, don't continue
		if (error) return;

		text.classList.remove("commentForm__input--error");
		name.classList.remove("commentForm__input--error");

		//create new comment object, post to server, and update comments list with the returned data
		let data = {
			name: name.value,
			comment: text.value,
		};
		let comment = await postComment(data);

		comments.unshift(comment);

		name.value = "";
		text.value = "";

		reloadComments();
	});

	//Load existing comments
	comments = await getComments();
	reloadComments();
};

function displayComment(comment) {
	//create the dom object
	let commentDiv = document.createElement("div");
	commentDiv.classList.add("comment");
	commentDiv.id = `comment-${comment.id}`;

	let leftDiv = document.createElement("div");
	leftDiv.classList.add("comment__img");
	commentDiv.appendChild(leftDiv);

	let img = document.createElement("img");
	leftDiv.appendChild(img);

	let likesDiv = document.createElement("div");
	likesDiv.classList.add("comment__like");
	leftDiv.appendChild(likesDiv);

	let likeButton = document.createElement("img");
	likeButton.src = "./assets/icons/SVG/heart-line.svg";
	likeButton.classList.add("comment__like-button");
	likesDiv.appendChild(likeButton);

	likeButton.addEventListener("click", () => {
		if (likeComment(comment.id) && !likeButton.src.includes("fill")) {
			comment.likes++;
			let likeCount = document.getElementById(`count-${comment.id}`);
			likeCount.innerText = comment.likes;
			likeCount.style.display = "";
			likeButton.src = "./assets/icons/SVG/heart-fill.svg";
		}
	});

	let likeCount = document.createElement("p");
	likeCount.id = `count-${comment.id}`;
	likeCount.style.display = comment.likes > 0 ? "inline" : "none";
	likeCount.innerText = comment.likes;
	likesDiv.appendChild(likeCount);

	let textDiv = document.createElement("div");
	textDiv.classList.add("comment__inner");
	commentDiv.appendChild(textDiv);

	let infoDiv = document.createElement("div");
	infoDiv.classList.add("comment__info");
	textDiv.appendChild(infoDiv);

	let name = document.createElement("p");
	name.innerText = comment.name;
	name.classList.add("comment__name");
	infoDiv.appendChild(name);

	let timeDelete = document.createElement("div");
	infoDiv.appendChild(timeDelete);
	//

	let del = document.createElement("img");
	del.classList.add("comment__delete");
	del.src = "./assets/icons/SVG/delete-bin-7-line.svg";
	timeDelete.appendChild(del);

	del.addEventListener("click", async () => {
		// TODO: Add confirmation dialog?
		if (await deleteComment(comment.id)) {
			commentDiv.parentElement.removeChild(commentDiv);
		}
	});

	let time = document.createElement("p");
	time.innerText = new Date(comment.timestamp).toLocaleDateString();
	time.classList.add("comment__time");
	timeDelete.appendChild(time);

	let text = document.createElement("p");
	text.innerText = comment.comment;
	textDiv.appendChild(text);

	//attach it to parent element and append hr after it
	let commentList = document.getElementById("comments");
	commentList.appendChild(commentDiv);
	commentList.appendChild(document.createElement("hr"));

	// Add two event listeners, one to show the delete button, and the other to hide it when the mouse enters/exists the div
	commentList.addEventListener("mouseenter", () => {});
}

function reloadComments() {
	comments.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});
	let div = document.getElementById("comments");

	//clear html and add new hr
	div.innerHTML = "";
	div.appendChild(document.createElement("hr"));

	comments.forEach((comment) => {
		displayComment(comment);
	});
}
