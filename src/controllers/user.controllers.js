const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const Users = await User.findAll();
    return res.json(Users)
});

const create = catchError(async(req, res) => {
    const {first_name, last_name, email, password, brithday } = req.body;
    const user = await User.create({
        first_name, last_name, email, password, brithday
    });
    return res.status(201).json(user)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await Game.findByPk(id);
    return res.json(user)
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({where: {id}});
    return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, brithday } = req.body;
    const user = await User.update(
            {first_name, last_name, email, password, brithday},
            {where: {id}, returning: true}
        );
    return res.json(user);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}