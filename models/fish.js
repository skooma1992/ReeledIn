module.exports = function (sequelize, DataTypes) {
    var Fish = sequelize.define("Fish", {
        species: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        biology: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }
    });

    // Fish.associate = function (models) {

    //     Fish.belongsTo(models.location, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Fish;
};