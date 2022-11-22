const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "uk_ksa05ndh95n2bfdwb5wt68541"
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shop',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "shop_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uk_ksa05ndh95n2bfdwb5wt68541",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
