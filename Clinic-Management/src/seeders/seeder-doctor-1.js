'use strict';

const { hashPassword } = require('../services/CRUDservices');
const {encodeBase64} = require('../algorithm/algorithm')
const path = require('path')

const parentPath = path.resolve(__dirname,'..');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu vào bảng Users
    let hashedPassword =await hashPassword('123456');
    await queryInterface.bulkInsert('Users', [{
        email: 'james@gmail.com',
        password: hashedPassword,
        firstName: 'Richars',
        lastName: 'James',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc1.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 1,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 1,
        specialtyId:1
      }], {});
    
    await queryInterface.bulkInsert('Users', [{
        email: 'larson@gmail.com',
        password: hashedPassword,
        firstName: 'Emily',
        lastName: 'Larson',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc2.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 2,
        
        degree: 'MBSS',
        experience: 1,info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        appointmentFee: 60
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 2,
        specialtyId:2
      }], {});

    await queryInterface.bulkInsert('Users', [{
        email: 'patel@gmail.com',
        password: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Patel',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc3.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 3,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 30
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 3,
        specialtyId: 3
      }], {});

    await queryInterface.bulkInsert('Users', [{  //
        email: 'minh@gmail.com',
        password: hashedPassword,
        firstName: 'Tran Wang',
        lastName: 'Minh',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc4.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 4,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 40
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 4,
        specialtyId: 4
      }], {});

      await queryInterface.bulkInsert('Users', [{
        email: 'garcia@gmail.com',
        password: hashedPassword,
        firstName: 'Jennifer',
        lastName: 'Garcia',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc5.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 5,
        
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 5,
        specialtyId: 5
      }], {});

      await queryInterface.bulkInsert('Users', [{
        email: 'williams@gmail.com',
        password: hashedPassword,
        firstName: 'Andrew',
        lastName: 'Williams',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc6.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 6,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 6,
        specialtyId: 5
      }], {});

    await queryInterface.bulkInsert('Users', [{
        email: 'davis@gmail.com',
        password: hashedPassword,
        firstName: 'Christopher',
        lastName: 'Davis',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc7.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 7,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 7,
        specialtyId: 1
      }], {});


    await queryInterface.bulkInsert('Users', [{
        email: 'white@gmail.com',
        password: hashedPassword,
        firstName: 'Timothy',
        lastName: 'White',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc8.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 8,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 60
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 8,
        specialtyId: 2
      }], {});

    await queryInterface.bulkInsert('Users', [{
        email: 'mitchell@gmail.com',
        password: hashedPassword,
        firstName: 'Ava',
        lastName: 'Mitchell',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc9.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 9,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 30
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 9,
        specialtyId: 3
      }], {});
    await queryInterface.bulkInsert('Users', [{
        email: 'king@gmail.com',
        password: hashedPassword,
        firstName: 'Jeffrey',
        lastName: 'King',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc10.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 10,
        
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 40
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 10,
        specialtyId: 4
      }], {});
    await queryInterface.bulkInsert('Users', [{
        email: 'kelly@gmail.com',
        password: hashedPassword,
        firstName: 'Zoe',
        lastName: 'Kelly',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc11.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 11,
        
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 11,
        specialtyId: 5
      }], {});
    await queryInterface.bulkInsert('Users', [{
        email: 'harris@gmail.com',
        password: hashedPassword,
        firstName: 'Patrick',
        lastName: 'Harris',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc12.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 12,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 12,
        specialtyId: 5
      }], {});
    await queryInterface.bulkInsert('Users', [{
        email: 'evans@gmail.com',
        password: hashedPassword,
        firstName: 'Chloe',
        lastName: 'Evans',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc13.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 13,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 50
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 13,
        specialtyId: 1
      }], {});
      await queryInterface.bulkInsert('Users', [{
        email: 'martinez@gmail.com',
        password: hashedPassword,
        firstName: 'Ryan',
        lastName: 'Martinez',
        address: 'London',
        gender: 1,
        image: encodeBase64(parentPath.concat('/images/doc14.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 14,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 60
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 14,
        specialtyId: 2
      }], {});
    await queryInterface.bulkInsert('Users', [{
        email: 'hill@gmail.com',
        password: hashedPassword,
        firstName: 'Amelia',
        lastName: 'Hill',
        address: 'London',
        gender: 2,
        image: encodeBase64(parentPath.concat('/images/doc15.png')),
        roleId: 'R1',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    await queryInterface.bulkInsert('doctorinfos', [{
        doctorId: 15,
        info:`Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
        degree: 'MBSS',
        experience: 1,
        appointmentFee: 30
      }], {});
      
    await queryInterface.bulkInsert('DoctorWithSpecialty', [{
        doctorId: 15,
        specialtyId: 3
      }], {});

    },
   

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DoctorWithSpecialty', null, {});
    await queryInterface.bulkDelete('doctorinfos', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
