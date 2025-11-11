export const SpiritModel = (sequelize, DataTypes) => {
  return sequelize.define('Spirit', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    complexity: { type: DataTypes.STRING },
  });
};
