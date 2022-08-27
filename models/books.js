"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      books.belongsTo(models.disability, {
        as: "booksDisability",
        foreignKey: "disability",
      });
    }
  }
  books.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      pdf: DataTypes.STRING,
      disability: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      isOther: DataTypes.BOOLEAN,
      otherDisabilities: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
