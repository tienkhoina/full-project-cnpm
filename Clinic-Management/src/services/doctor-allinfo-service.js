const db = require('../models/index');
const { Error } = require('sequelize');

const { getNextSevenDays } = require('../algorithm/algorithm')

let getDoctorScheduleById = async (userId) => {

    try {
        let schedule = await db.Schedule.findAll({
            attributes: ['id', 'date', 'timeType', 'doctorId', 'createdAt', 'updatedAt'],
            where: {
                doctorId: userId
            }
        })


        if (schedule[0]) {
            return schedule;
        }
        else {
            return {};
        }


    } catch (error) {
        throw error;
    }

}

let getDoctorCalendarFree = async (userId) => {
    let allTimeType = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]
    let doctorSchedule = await getDoctorScheduleById(userId);
   
    let freeDays = getNextSevenDays();
    if(doctorSchedule[0]){
    doctorSchedule.forEach(function (item, index) {

        let date = item.dataValues.date
        date.setHours(7, 0, 0, 0)
        if (date.toISOString() in freeDays) freeDays[date.toISOString()].push(item.dataValues.timeType)
    })
    }

    for (let date in freeDays) {
        freeDays[date] = allTimeType.filter(item => !freeDays[date].includes(item));
    }
    return freeDays;

}

let getDoctorBySpecialtyName = async (specialtyName) => {
    try {
        let results = await db.Specialty.findAll({
            where: {
                name: specialtyName
            },
            include: [
                {
                    model: db.SpecialtyDoctorWithSpecialty,
                    attributes: [],
                    required: true,  // Chỉ lấy các bản ghi có khớp (INNER JOIN)
                    on: db.Sequelize.literal('SpecialtyDoctorWithSpecialty.specialtyId = Specialty.id'),
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'name', 'email'],
                            required: true,
                            on: db.Sequelize.literal('Users.id = SpecialtyDoctorWithSpecialty.doctorId')
                        }
                    ]
                }
            ]
        });

        if (results[0]) {
            return results;
        }
        else {
            return {};
        }
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    getDoctorScheduleById,
    getDoctorBySpecialtyName,
    getDoctorCalendarFree
}