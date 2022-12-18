var comments = [
    {
        name:"Connor Walton",
        text:"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        time:1613538000000
    },
    {
        name:"Emilie Beach",
        text:"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
        time:1610168400000
    },
    {
        name:"Miles Acosta",
        text:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        time:1608440400000
    }
]

window.onload = ()=>{
    const name = document.getElementById("name");
    const text = document.getElementById("comment");
    const submit = document.getElementById("submit");

    submit.addEventListener("click", (e)=>{
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

        //create new comment object and reset
        let comment = {
            name:name.value,
            text:text.value,
            time:Date.now()
        };
        comments.unshift(comment);

        name.value = "";
        text.value = "";

        reloadComments();
    })

    //Load existing comments
    reloadComments();
}

function displayComment(comment) {
    //create the dom object
    let commentDiv = document.createElement("div")
    commentDiv.classList.add("comment")

    let commentImageDiv = document.createElement("div")
    commentImageDiv.classList.add("comment__img")
    commentDiv.appendChild(commentImageDiv)

    let img = document.createElement("img")
    commentImageDiv.appendChild(img);

    let textDiv = document.createElement("div")
    textDiv.classList.add("comment__inner")
    commentDiv.appendChild(textDiv)

    let infoDiv = document.createElement("div")
    infoDiv.classList.add("comment__info")
    textDiv.appendChild(infoDiv)

    let name = document.createElement("p")
    name.innerText = comment.name;
    name.classList.add("comment__name")
    infoDiv.appendChild(name)

    let time = document.createElement("p")
    time.innerText = (new Date(comment.time)).toLocaleDateString();
    time.classList.add("comment__time")
    infoDiv.appendChild(time)

    let text = document.createElement("p")
    text.innerText = comment.text;
    textDiv.appendChild(text)

    //attach it to parent element and append hr after it
    let commentList = document.getElementById("comments")
    commentList.appendChild(commentDiv)
    commentList.appendChild(document.createElement("hr"))
}

function reloadComments() {
    let div = document.getElementById("comments");
    
    //clear html and add new hr
    div.innerHTML = ""
    div.appendChild(document.createElement("hr"))

    comments.forEach((comment)=>{
        displayComment(comment)
    })
    console.log(comments)
}