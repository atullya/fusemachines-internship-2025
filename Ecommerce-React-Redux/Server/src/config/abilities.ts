import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { IUser } from "../models/user.model";

export function defineAbilitiesFor(user: IUser) {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  if (user.role === "admin") {
    can("manage", "all");
  } else {
    can("read", "Product");
  }

  return build();
}
