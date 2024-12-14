const express = require('express')
const router = express.Router()

const { checkLogin, createUser, changePassWord, getAppointment, updateYourImage, getProfile, getDoctorProfile, updateData, getDoctor, getMyProfile, updateMyProfile,allPatients, AddDoctor, getDoctorForAdmin, updateDoctor, deleteUser } = require("../controllers/userController")

const { bookingAppointMent, getMyAppointment, getMyPatients, getMyPreviousPatients, deleteBookingsAppointment, allBookings } = require('../controllers/bookingController')
const { checkDoctorFree } = require('../controllers/doctorAllInfoController')
const   { getResponse } = require('../controllers/botController')

router.post('/api/login', checkLogin)
router.post('/api/register', createUser)
router.post('/api/changePassword', changePassWord)
router.post('/api/appointments', bookingAppointMent)
router.get('/api/doctor-calendar-free', checkDoctorFree)

router.get('/api/get-my-appointment/:id', getMyAppointment)
router.get('/api/get-my-patient/:id', getMyPatients)
router.get('/api/get-my-previous-patient/:id', getMyPreviousPatients)
router.post('/api/updateImage', updateYourImage)
router.post('/api/user-profile', getProfile)
router.get('/api/doctor-profile', getDoctorProfile)
router.post('/api/user-profile-change', updateData)
router.get('/api/get-all-doctor', getDoctor)
// router.get('/api/specialties',getSpecialties)

router.get('/api/get-my-profile', getMyProfile)
router.put('/api/update-my-profile', updateMyProfile)
router.get('/api/get-all-bookings',allBookings)
router.post('/api/delete-appointment', deleteBookingsAppointment)
router.get('/api/get-all-patients',allPatients)
router.post('/api/doctors/add',AddDoctor)
router.post('/api/get-bot-response',getResponse)
router.get('/api/get-doctor-for-admin',getDoctorForAdmin)
router.put('/api/update-doctor/:docId',updateDoctor)
router.delete('/api/delete-doctor/:docId',deleteUser)

module.exports = router