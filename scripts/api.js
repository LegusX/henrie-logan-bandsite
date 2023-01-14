const KEY = "36dee350-a16b-4aa1-9f90-54c87ac38210"
const API = "https://project-1-api.herokuapp.com"

axios.defaults.params = {
    api_key: KEY
}
axios.defaults.baseURL = API
axios.defaults.headers = {
    "Content-Type": "application/json"
}

async function getComments() {
    let r = await axios.get("/comments")
    if (r.status === 200) return r.data
    else console.error("Failed to retrieve comments")
}

async function getShowdates() {
    let r = await axios.get("/showdates")
    if (r.status === 200) return r.data
    else console.error("Failed to retrieve show dates")
}

async function postComment(comment) {
    let r = await axios.post("/comments", comment)
    if (r.status === 200) return r.data
    else {
        console.error("Failed to post comment")
        return false;
    }
}

async function likeComment(id) {
    let r = await axios.put(`/comments/${id}/like`)
    if (r.status === 200) return true
    else {
        console.error("Failed to like comment. Comment likely doesn't exist.")
        return false
    }
}

async function deleteComment(id) {
    let r = await axios.delete(`/comments/${id}`)
    if (r.status === 200) return true
    else {
        console.error("Failed to like delete comment. Comment likely doesn't exist.")
        return false
    }
}