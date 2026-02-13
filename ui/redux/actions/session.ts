import { User } from "@core/User/domain";
import { PayloadAction } from "@reduxjs/toolkit";

export const SetSessionRdx = (
  state: Omit<User, "password">,
  action: PayloadAction<User>
) => {
  const payload = action.payload;
  state.businessName = payload.businessName;
  state.country = payload.country;
  state.email = payload.email;
  state.lastName = payload.lastName;
  state.modules = payload.modules;
  state.name = payload.name;
  state.phone = payload.phone;
  state.status = payload.status;
  state.tokenSigin = payload.tokenSigin;
  state.type = payload.type;
  state.typeOfRestaurant = payload.typeOfRestaurant;
  state.uniqueId = payload.uniqueId;
};
