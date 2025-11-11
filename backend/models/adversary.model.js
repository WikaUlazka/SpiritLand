export const AdversaryModel = (sequelize, DataTypes) => {
  return sequelize.define('Adversary', {
    name: { type: DataTypes.STRING, allowNull: false },
    difficultyLevels: { type: DataTypes.JSONB },
  });
};
