const { createUser, getAllUsers, findUserById, banUserById, userEdit } = require('../Controllers/Users.controller.js');

const postUser = async (req, res) => {
    try {
        const { name, nickname, avatar, email, password, status} = req.body;
        if(!name || !nickname || !avatar || !email || !password || !status) return res.status(400).send('Faltan datos');

        const user = await createUser(name, nickname, avatar, email, password, status);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const userById = await findUserById(id);
        res.status(200).json(userById)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const banDesbanUser = async (req, res) => {
    const {id} = req.params;
    try {
        const bannedUser = await banUserById(id);
        res.status(200).json(bannedUser)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const editUser = async (req, res) => {
    try {
        if (!req.body) {  
            return res.status(400).json({ error: 'Datos insuficientes'});
        }
        const data = req.body
        const editedUser = await userEdit(data)
        
        return res.status(200).json(editedUser)
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = {
    postUser,
    getUsers,
    getUserById, 
    banDesbanUser, 
    editUser
};