const Users = require("../Models/Users.model");

const createUser = async (name, nickname, avatar, email, password, status) => {
    const [userCreated, created] = await Users.findOrCreate({
        where: { email },
        defaults: {
            name,
            nickname,
            avatar,
            password,
            status
        }
    });

    if(created) {
        return userCreated;
    } else {
        throw Error("El mail ya esta en uso")
    };
}

const getAllUsers = async () => {
    const allUsersActive = await Users.findAll({
        where: {
            banned: false,
        },
    });

    const allUsersBanned = await Users.findAll({
        where: {
            banned: true
        },
    });
    
    return allUsers = [allUsersActive, allUsersBanned];
}

const findUserById = async (id) => {
    const userById = await Users.findByPk(id)
    return {userById}; 
}

const banUserById = async (id) => {
    const { userById } = await findUserById(id);

    userById.banned = !bannedUser;

    await userById.save();

    return "Se baneo correctamente al usuario";
    
}

const userEdit = async (data) => {
    const { id, name, nickname, avatar, password, status } = data;

    const {userById} = await findUserById(id);

    userById.name = name || userById.name;
    userById.nickname = nickname || userById.nickname;
    userById.avatar = avatar || userById.avatar;
    userById.password = password || userById.password;
    userById.status = status || userById.status;

    await userById.save();

    return "se actualizaron los datos correctamente";

}

module.exports = { 
    createUser, 
    getAllUsers, 
    findUserById, 
    banUserById, 
    userEdit 
};