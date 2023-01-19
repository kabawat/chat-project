const jwt = require('jsonwebtoken')
const { userModal } = require('../connection')
exports.AllUser = (req, res) => {
    const getdata = async () => {
        const data = await userModal.find()
        const filter = data.map((curElem) => {
            const { _id, user, email } = curElem
            return { _id, user, email }
        })
        res.status(200).json(filter)
    }
    getdata()
}

exports.userProfile = (req, res) => {
    const token = req.cookies.auth
    const data = jwt.decode(token)
    const getData = async () => {
        const result = await userModal.findOne({ user: data.user })
        console.log("result: ", result);
        const { _id, user, email } = result
        const profile = {
            _id,
            user,
            email,
            status: true
        }
        res.status(200).json(profile)
    }
    getData()
}