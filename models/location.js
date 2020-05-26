module.exports = function(sequelize, DataTypes){
	var Location = sequelize.define("Location", {
        id: {
            type: DataTypes.BIGINT(11),
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        lat: {
            type: DataTypes.DECIMAL (16, 14),
            allowNull: false,
        
        },
        lng: {
            type: DataTypes.DECIMAL (16, 14) ,
            allowNull: false,
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
	});
	return Location;
};