module.exports = (sequelize, DataTypes) => {
    const book = sequelize.define(
        'book',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ISBN: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price:{
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            image_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            published_year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_date_time: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            modified_date_time: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            }
        },
        {
            tableName: 'book',
        }
    )

    book.associate = (models) => {
        book.hasMany(models.borrowed_book, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    }

    return book;
}