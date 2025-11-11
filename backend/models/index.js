import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

// === Model Spirit ===
const Spirit = sequelize.define('Spirit', {
  name: { type: DataTypes.STRING, allowNull: false },
  complexity: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

// === Model Adversary ===
const Adversary = sequelize.define('Adversary', {
  name: { type: DataTypes.STRING, allowNull: false },
  difficulty: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

// === Model Scenario ===
const Scenario = sequelize.define('Scenario', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

// Synchronizacja modeli
await sequelize.sync({ alter: true });
console.log('✅ Połączono z bazą PostgreSQL i zsynchronizowano modele.');

// Eksport wszystkiego
export { sequelize, Spirit, Adversary, Scenario };
