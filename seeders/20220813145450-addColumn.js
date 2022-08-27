module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .addColumn("training", "isOther", {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            })
            .then(() => {
                return queryInterface.addColumn(
                    "training",
                    "otherDisabilities",
                    {
                        type: Sequelize.ARRAY(Sequelize.INTEGER),
                        defaultValue: [],
                    }
                );
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn("training", "isOther");
    },
};
