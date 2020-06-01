const faker = require('faker');

class RandomUser {
    constructor(random) {
        this.faker = random;
    }

    genUpdUser = id => {
        return { id, fullName: `${this.faker.name.firstName()} ${this.faker.name.lastName()}` };
    };

    generate = () => {
        const lastname = this.faker.name.lastName();
        const fullName = `${this.faker.name.firstName()} ${lastname}`;
        const email = `${lastname.toLowerCase()}@mail.com`;
        return {
            fullName,
            email,
        };
    };

    generateMany = length => {
        const users = [];
        for (let i = 0; i < length; i += 1) {
            const user = this.generate();
            users.push(user);
        }
        return users;
    };
}

module.exports = new RandomUser(faker);
