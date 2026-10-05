import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.models.js";
import { PersonModel } from "./person.models.js";
import { RoleModel } from "./role.models.js";
import { UserRoleModel } from "./user_role.models.js";

//relacion 1a1

//un usuario pertenece a una persona.
UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "owner" });

// una persona puede tener un usuario
PersonModel.hasOne(UserModel, { foreignKey: "person_id", as: "user " });

PersonModel.hasMany(RoleModel, { foreignKey: "rol_id", as: "rol" });

//relacion mucho a muchos
UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles ",
});

UserModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});

// Agrega esto al final de src/models/index.js (después de definir las relaciones)

export { UserModel, PersonModel, RoleModel, UserRoleModel, sequelize };
