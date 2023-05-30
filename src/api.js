import axios from 'axios'

const api = axios.create({
    baseURL: 'https://house-of-games-7nlp.onrender.com/api'
})

export function getReviews() {
    return api
        .get('/reviews')
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