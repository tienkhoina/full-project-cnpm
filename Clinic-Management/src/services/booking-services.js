const { query } = require('express');
const db = require('../models/index');
const { Error, where } = require('sequelize');



let insertBookings = async (doctorId, patientId, date, timeType) => {
    try {
        await db.Booking.create({
            statusId: "S1",
            doctorId: doctorId,
            patientID: patientId,
            date: date,
            timeType: timeType,
        });
    } catch (e) {
        throw new Error(e); // Thêm lỗi nếu có
    }
}
let deleteBookings = async (doctorId, patientId, date, timeType) => {
    let booking = await db.Booking.findOne({
        raw: true,
        where: {
            statusId: "S1",
            doctorId: doctorId,
            patientID: patientId,
            date: date,
            timeType: timeType,
        }
    })

    const result = await db.Booking.destroy({
        where: {
            id: booking.id, // Điều kiện xóa
        },
    });

    return result;
}

let insertSchedules = async (doctorId, date, timeType) => {
    try {
        await db.Schedule.create({
            doctorId: doctorId,
            date: date,
            timeType: timeType,
        });
    } catch (e) {
        throw new Error(e); // Thêm lỗi nếu có
    }
}
let deleteSchedules = async (doctorId, date, timeType) => {
    try {
        let schedule = await db.Schedule.findOne({
            raw: true,
            where: {
                doctorId: doctorId,
                date: date,
                timeType: timeType,
            }
        });
        const result = await db.Schedule.destroy({
            where: {
                id: schedule.id, // Điều kiện xóa
            },
        });
        return result;
    } catch (e) {
        throw new Error(e); // Thêm lỗi nếu có
    }
}

let getAllBookings = async () => {
    try {
        const query = `SELECT 
    CONCAT(u1.firstName, ' ', u1.lastName) AS pName,
    u1.image,
    CONCAT('Dr. ', u2.firstName, ' ', u2.lastName) AS dName,
    doctorinfos.appointmentFee AS fees,
    bookings.date
FROM 
    Users u1
JOIN 
    bookings ON bookings.patientID = u1.id 
JOIN 
    Users u2 ON u2.id = bookings.doctorId 
JOIN 
    doctorinfos ON doctorinfos.doctorId = u2.id 
ORDER BY 
    bookings.date DESC;`
        const [results, metadata] = await db.sequelize.query(query);
        return results;
    } catch (e) {
        throw new Error(e);
    }
}

let getBookingsByPatientId = async (patientId) => {
    try {
        let bookings = await db.Booking.findAll({
            raw: true,
            where: {
                patientId: patientId,
            },
        });
        return bookings;
    } catch (e) {
        throw new Error(e);
    }
}

let checkPatientBooking = async (patientId, date, timeType) => {

    try {
        let bookings = await db.Booking.findAll({
            raw: true,
            where: {
                patientId: patientId,
                date: date,
                timeType: timeType,
            },
        });
        return bookings.length > 0;
    } catch (e) {
        throw new Error(e);
    }
}

let getDoctorInvolve = async (userId) => {
    const query = `SELECT u2.*,bookings.timeType,bookings.date from Users u1 join bookings on bookings.patientID =u1.id join Users u2 on u2.id =bookings.doctorId where u1.id=${userId}`;


    const [results, metadata] = await db.sequelize.query(query);

    let doctors = []
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const gmt7 = new Date(utc + 14 * 3600000);

    const timeSlotMapping = {
        T1: "08:00:00",
        T2: "09:00:00",
        T3: "10:00:00",
        T4: "11:00:00",
        T5: "14:00:00",
        T6: "15:00:00",
        T7: "16:00:00",
        T8: "17:00:00",
    };


    for (let doc of results) {

        let doctor = {
            _id: 'doc' + doc.id,
            name: 'Dr. ' + doc.firstName + ' ' + doc.lastName,
            image: doc.image,
            date: doc.date,
            timeType: doc.timeType,
            address: {
                line1: doc.address,
                line2: ''
            }
        }

        const [hours, minutes, seconds] = timeSlotMapping[doctor.timeType].split(":").map(Number);
        doctor.date.setHours(hours + 7, minutes, seconds, 0);
        doctor.date.toISOString()
        if (doctor.date >= gmt7) {
            doctors.push(doctor)
        }
    }

    return doctors;

}

let getPatientInvolve = async (userId) => {
    const query = `SELECT u1.*,bookings.timeType,bookings.date from Users u1 join bookings on bookings.patientID =u1.id join Users u2 on u2.id =bookings.doctorId where u2.id=${userId}`;


    const [results, metadata] = await db.sequelize.query(query);

    let doctors = []
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const gmt7 = new Date(utc + 14 * 3600000);

    const timeSlotMapping = {
        T1: "08:00:00",
        T2: "09:00:00",
        T3: "10:00:00",
        T4: "11:00:00",
        T5: "14:00:00",
        T6: "15:00:00",
        T7: "16:00:00",
        T8: "17:00:00",
    };

    for (let doc of results) {

        let doctor = {
            _id: doc.id,
            name: doc.firstName + ' ' + doc.lastName,
            image: doc.image,
            date: doc.date,
            timeType: doc.timeType,
            address: {
                line1: doc.address,
                line2: ''
            }
        }

        const [hours, minutes, seconds] = timeSlotMapping[doctor.timeType].split(":").map(Number);
        doctor.date.setHours(hours + 7, minutes, seconds, 0);
        doctor.date.toISOString()
        if (doctor.date >= gmt7) {
            doctors.push(doctor)
        }
    }

    return doctors;
}

let getPreviousPatientsInvolve = async (userId) => {
    const query = `SELECT u1.*,bookings.timeType,bookings.date from Users u1 join bookings on bookings.patientID =u1.id join Users u2 on u2.id =bookings.doctorId where u2.id=${userId}`;


    const [results, metadata] = await db.sequelize.query(query);

    let doctors = []
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const gmt7 = new Date(utc + 14 * 3600000);

    const timeSlotMapping = {
        T1: "08:00:00",
        T2: "09:00:00",
        T3: "10:00:00",
        T4: "11:00:00",
        T5: "14:00:00",
        T6: "15:00:00",
        T7: "16:00:00",
        T8: "17:00:00",
    };

    for (let doc of results) {

        let doctor = {
            _id: doc.id,
            name: doc.firstName + ' ' + doc.lastName,
            image: doc.image,
            date: doc.date,
            timeType: doc.timeType,
            address: {
                line1: doc.address,
                line2: ''
            }
        }

        const [hours, minutes, seconds] = timeSlotMapping[doctor.timeType].split(":").map(Number);
        doctor.date.setHours(hours + 7, minutes, seconds, 0);
        doctor.date.toISOString()
        if (doctor.date < gmt7) {
            doctors.push(doctor)
        }
    }

    return doctors;
}




module.exports = {
    insertBookings, insertSchedules, getAllBookings, getBookingsByPatientId,
    checkPatientBooking, getDoctorInvolve, deleteBookings, deleteSchedules, getPatientInvolve, getPreviousPatientsInvolve,getAllBookings
}