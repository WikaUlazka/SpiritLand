export const ScenarioModel = (sequelize, DataTypes) => {
  return sequelize.define('Scenario', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  });
};
