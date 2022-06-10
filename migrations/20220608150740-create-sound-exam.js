"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("soundExams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      pdf: {
        type: Sequelize.STRING,
      },
      disability: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("soundExams");
  },
};
