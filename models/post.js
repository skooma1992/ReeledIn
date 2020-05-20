module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Post.associate = models => {
        Post.belongsTo(models.User, {foreignKey: 'author_id'});
      
        }
    // Post.associate = function (models) {

    //     Post.belongsTo(models.user, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Post;
};