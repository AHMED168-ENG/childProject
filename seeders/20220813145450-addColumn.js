const bcrypt = require("bcrypt");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert("disabilities", [
                {
                    name: "عدم القدره علي نطق حرف الكاف",
                    description: "عدم القدره علي نطق حرف الكاف",
                    image: "https://res.cloudinary.com/ahmed-zakys/image/upload/v1662473296/children/disabilitys/ssssss_nakesd.png",
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
                        image: "https://res.cloudinary.com/ahmed-zakys/image/upload/v1662473127/children/users/ssssss_l3h6jm.png",
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
