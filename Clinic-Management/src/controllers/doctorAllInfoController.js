const db = require('../models/index');
const bcrypt = require('bcrypt');

const { getDoctorScheduleById, getDoctorCalendarFree, } = require('../services/doctor-allinfo-service')
const { doctorIdtoUserId } = require('../algorithm/algorithm')

let checkDoctorFree = async (req, res) => {
    let doctorId = req.query.doctorId;
    doctorId = doctorIdtoUserId(doctorId)
    let free = await getDoctorCalendarFree(doctorId)
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data: free
    })
}

module.exports = { checkDoctorFree };
