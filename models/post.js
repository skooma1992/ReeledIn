module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 480]
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        length: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        weight: {
            type: DataTypes.DECIMAL ,
            allowNull: true,
        }
    });

    Post.associate = function (models) {

        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};