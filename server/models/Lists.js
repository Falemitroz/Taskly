module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define("Lists", {
    listId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
  });

  Lists.associate = (models) => {
    Lists.hasMany(models.Tasks, {
      foreignKey: "ListId",
      sourceKey: "listId",
      onDelete: "cascade",
    });
  };

  return Lists;
};
