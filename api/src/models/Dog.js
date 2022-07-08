const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, //--> el tipo UUID se usa para crear una columna que almacena identificadores universales únicos.
      defaultValue: DataTypes.UUIDV4, //--> Sequelize proporciona UUIDV1 y UUIDV4 como el valor predeterminado para las columnas de tipo UUID que puede usar al definir el modelo.
      allowNull: false, //--> no te permito que este vacio, es un campo requerido.
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    bred_for: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    }
  });
};
