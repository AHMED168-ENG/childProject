const bcrypt = require("bcrypt");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert("disabilities", [
                {
                    name: "عدم القدره علي نطق حرف الكاف",
                    description: "عدم القدره علي نطق حرف الكاف",
                    image: "https://res.cloudinary.com/takllm/image/upload/v1663088535/Takllm/disability/8c841472-a91f-44bb-9a1f-ce41313679fc_hmucyq.jpg--",
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
                        image: "https://res.cloudinary.com/takllm/image/upload/v1663088460/Takllm/users/ssssss_lijrp8.png--",
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
