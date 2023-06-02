import axios from 'axios'

const api = axios.create({
    baseURL: 'https://house-of-games-7nlp.onrender.com/api'
})

export function getReviews(categoryQuery) {
    let endpoint = '/reviews'
    if (categoryQuery) {
        endpoint += `?category=${categoryQuery}`
    }
    return api
        .get(endpoint)
        .then((res) => {
            return res.data
        })
}

export function getReviewByID(reviewID) {
    return api
        .get(`/reviews/${reviewID}`)
        .then((res) => {
            return res.data
        })
}

export function patchReviewVote(reviewID, voteRequest) {
    return api
        .patch(`/reviews/${reviewID}`, voteRequest)
        .then((res) => {
            return res.data
        })
}

export function getUserByUsername(username) {
    return api
        .get(`/users/${username}`)
        .then((res) => {
            return res.data
        })
}

export function getComments(reviewID) {
    return api
        .get(`/reviews/${reviewID}/comments`)
        .then((res) => {
            return res.data
        })
}

export function postComment(reviewID, comment) {
    return api
        .post(`/reviews/${reviewID}/comments`, comment)
}

export function patchCommentVote(commentID, voteRequest) {
    return api
        .patch(`/comments/${commentID}`, voteRequest)
        .then((res) => {
            return res.data
        })
}

export function getUsers() {
    return api
        .get('/users')
        .then((res) => {
            return res.data
        })
}

export function getCategories() {
    return api
        .get('/categories')
        .then((res) => {
            return res.data
        })
}