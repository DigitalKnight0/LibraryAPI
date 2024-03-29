module.exports = (sequelize, DataTypes) => {
    const borrowed_book = sequelize.define(
        'borrowed_book',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            book_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            borrowed_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            returned_date: {
                type: DataTypes.DATE,
                allowNull: true,
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
            },
        },
        {
            tableName: 'borrowed_book',
        }
    );

    borrowed_book.associate = (models) => {
        borrowed_book.belongsTo(models.book, {
            foreignKey: 'book_id',
            onDelete: 'CASCADE',
        });
        borrowed_book.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    }

    return borrowed_book;
}