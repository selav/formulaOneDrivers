/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circuits', {
    circuit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    circuit_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    alt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      //unique: true
    }
  }, {
    indexes:[
      {
        unique:true,
        fields:['url']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'circuits',
    schema: 'public'
  });
};
