module.exports = function(sequelize, DataTypes){
	var Location = sequelize.define("location", {
        latitude: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        longitude: {
            type: DataTypes.STRING ,
            allowNull: false,
            len: [1]
        },
        name: {
            type: DataTypes.STRING ,
            allowNull: false,
            len: [1]
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        }
	});
	return Location;
};