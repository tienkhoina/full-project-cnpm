const { json } = require('express');
const { getUserRole } = require('../services/CRUDservices');

let getHomePageRole = async (req, res) => {
    try {
        let userId = req.query.id;


        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required.'
            });
        }


        let RoleName = await getUserRole(userId);


        if (!RoleName) {
            return res.status(404).json({
                message: 'User role not found.'
            });
        }


        return res.status(200).json({
            userRole: RoleName,
            message: `You are logging in as ${RoleName}`
        });

    } catch (error) {

        return res.status(500).json({
            message: 'An error occurred.',
            error: error.message
        });
    }
};
