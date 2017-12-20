export default (sequelize, DataType) => {
    const Event = sequelize.define('event', {
        startDate: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            get(){
                const date = this.getDataValue('startDate');
                return date.toLocaleString();
            }
        },
        endDate: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            get(){
                const date = this.getDataValue('endDate');
                return date.toLocaleString();
            }
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt:{
            type: DataType.DATE,
            get(){
                const date = this.getDataValue('createdAt');
                return date.toLocaleString();
            }
        },
        updatedAt:{
            type: DataType.DATE,
            get(){
                const date = this.getDataValue('updatedAt');
                return date.toLocaleString();
            }
        }
    });

    return Event;
}