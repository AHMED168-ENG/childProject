const bcrypt = require("bcrypt");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert("disabilities", [
                {
                    name: "عدم القدره علي نطق حرف الباء",
                    description: "عدم القدره علي نطق حرف الباء",
                    image: "0.4535069939727103ب.jpg--",
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ])
            .then(() => {
                return queryInterface.bulkInsert("users", [
                    {
                        name: "ahmed reda",
                        email: "ahmed@ahmed.com",
                        age: 22,
                        password: bcrypt.hashSync("01024756410ahmed", 10),
                        gender: true,
                        isAdmin: true,
                        isDoctor: true,
                        active: true,
                        image: "0.00387338867850362ssssss.jpg--",
                        Disability: [1],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]);
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    },
};
