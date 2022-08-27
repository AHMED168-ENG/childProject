"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class soundExam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            soundExam.belongsTo(models.disability, {
                as: "soundDisability",
                foreignKey: "disability",
            });
        }
    }
    soundExam.init(
        {
            title: DataTypes.TEXT,
            active: DataTypes.BOOLEAN,
            pdf: DataTypes.STRING,
            disability: DataTypes.INTEGER,
            image: DataTypes.STRING,
            isOther: DataTypes.BOOLEAN,
            otherDisabilities: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        {
            sequelize,
            modelName: "soundExam",
        }
    );
    return soundExam;
};
