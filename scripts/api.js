const KEY = "36dee350-a16b-4aa1-9f90-54c87ac38210"
const API = "https://project-1-api.herokuapp.com"

axios.defaults.params = {
    api_key: KEY
}
axios.defaults.baseURL = API

function getComments() {
    axios.get("/comments")
        .then((r) => {
            if (r.status === 200) return r.data
            else console.error("Failed to retrieve comments")
        })
}

function getShowdates() {
    axios.get("/showdates")
        .then((r) => {
            if (r.status === 200) return r.data
            else console.error("Failed to retrieve showdates")
        })
}

function postComment(comment) {
    axios.post("/comments", comment)
        .then((r) => {
            if (r.status === 200) return r.data
            else console.error("Failed to post comment")
        })
}

function likeComment(id) {
    axios.put(`/comments/${id}/like`)
        .then((r) => {
            if (r.status === 200) return true
            else {
                console.error("Failed to like comment. Comment likely doesn't exist.")
                return false
            }
        })
}

function deleteComment(id) {
    axios.delete(`/comments/${id}`)
        .then((r) => {
            if (r.status === 200) return true
            else {
                console.error("Failed to delete comment. Comment likely doesn't exist.")
                return false
            }
        })
}