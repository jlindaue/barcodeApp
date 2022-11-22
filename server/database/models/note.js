const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('note', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'note',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "note_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
