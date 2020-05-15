const UserService = require('./services/tableService');
// const UserValidation = require('./validation');
// const ValidationError = require('../../error/ValidationError');
const transformateStat = require('./services/statistic');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        res.status(200).render('index', {
            table: 'home',
            csrfToken: req.csrfToken(),
            template: 'users/table.ejs',
            users,
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        res.status(500).render('errors/validError.ejs', {
            method: 'get',
            name: error.name,
            message: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getStatistic(req, res, next) {
    try {
        const statisticArr = await UserService.getStatistic(30);
        const statistic = transformateStat(statisticArr);

        res.status(200).render('index', {
            csrfToken: req.csrfToken(),
            template: 'users/statistic.ejs',
            statistic,
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
        res.redirect('/v1/users');
    } catch (error) {
        req.flash('error', { name: error.name, message: error.message });
        res.redirect('/v1/users');

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findByEmail(req, res, next) {
    try {
        // const { error } = UserValidation.findById(req.params);

        // if (error) {
        //     throw new ValidationError(error.details);
        // }
        // console.log(req.body.email);
        const users = await UserService.findByEmail(req.body.email);

        if (users.length === 0) {
            req.flash('error', { name: 'Not Found', message: `User with email ${req.body.email} not found!` });
            res.redirect('/v1/users');
        }
        res.status(200).render('index', {
            table: 'find',
            csrfToken: req.csrfToken(),
            template: 'users/table.ejs',
            users,
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).json({
        //         error: error.name,
        //         details: error.message,
        //     });
        // }

        req.flash('error', { name: error.name, message: error.message });
        res.redirect('/v1/users');

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        // const { error } = UserValidation.create(req.body);

        // if (error) {
        //     throw new ValidationError(error.details);
        // }

        const { insertId } = await UserService.create(req.body);

        req.flash('sucsess', {
            method: 'post',
            id: insertId,
            name: req.body.fullName,
        });
        return res.redirect('/v1/users');
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     req.flash('error', error.message);
        //     return res.redirect('/v1/users');
        // }
        // if (error.name === 'MongoError') {
        //     req.flash('error', { name: error.name, message: error.errmsg });
        //     return res.redirect('/v1/users');
        // }
        req.flash('error', { name: error.name, message: error.message });
        res.redirect('/v1/users');

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        // const { error } = UserValidation.updateById(req.body);

        // if (error) {
        //     console.log(error);
        //     throw new ValidationError(error.details);
        // }

        const result = await UserService.updateById(req.body);
        if (result.changedRows) {
            req.flash('sucsess', {
                method: 'put',
                id: req.body.id,
                name: req.body.fullName,
            });
        }

        return res.redirect('/v1/users');
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     req.flash('error', error.message);
        //     return res.redirect('/v1/users');
        // }

        req.flash('error', { name: error.name, message: error.message });
        res.redirect('/v1/users');

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        // const { error } = UserValidation.deleteById(req.body);

        // if (error) {
        //     throw new ValidationError(error.details);
        // }
        const { serverStatus } = await UserService.deleteById(req.body.id);

        if (serverStatus === 2) {
            req.flash('sucsess', {
                method: 'delete',
                id: req.body.id,
            });
        }

        return res.redirect('/v1/users');
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).render('errors/validError.ejs', {
        //         method: 'delete',
        //         name: error.name,
        //         message: error.message[0].message,
        //     });
        // }

        req.flash('error', { name: error.name, message: error.message });
        res.redirect('/v1/users');

        next(error);
    }
}

module.exports = {
    findAll,
    getStatistic,
    findByEmail,
    create,
    updateById,
    deleteById,
};
