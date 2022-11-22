const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_memberships', {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id'
      }
    },
    memberships_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'membership',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'client_memberships',
    schema: 'public',
    timestamps: false
  });
};
