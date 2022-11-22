const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('membership', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shop',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'membership',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "membership_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
