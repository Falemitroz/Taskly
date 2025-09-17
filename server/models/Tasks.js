module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    taskId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  return Tasks;
};
