const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    findById(email) {
        return this.Joi.object({
            email: this.Joi.string().email(),
        }).validate({ email });
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
    create(profile) {
        return this.Joi.object({
            email: this.Joi.string().email(),
            fullName: this.Joi.string().min(3).max(30).required(),
        }).validate(profile, {
            allowUnknown: true,
        });
    }

    /**
     * @param {String} data.id
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    updateById(data) {
        return this.Joi.object({
            id: this.Joi.number().integer(),
            fullName: this.Joi.string().min(3).max(30).required(),
        }).validate(data, { allowUnknown: true });
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    deleteById(data) {
        return this.Joi.object({
            id: this.Joi.number().integer(),
        }).validate(data, { allowUnknown: true });
    }
}

module.exports = new UserValidation();
