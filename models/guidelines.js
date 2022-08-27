"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class guideLines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      guideLines.belongsTo(models.disability, {
        as: "guideLinesDisability",
        foreignKey: "disability",
      });
    }
  }
  guideLines.init(
    {
      title: DataTypes.STRING,
      disability: DataTypes.INTEGER,
      pdf: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      isOther: DataTypes.BOOLEAN,
      otherDisabilities: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "guideLines",
    }
  );
  return guideLines;
};
