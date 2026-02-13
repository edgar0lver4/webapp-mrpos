import { User } from "@core/User/domain";
import { USER_STATUS, USER_TYPES } from "@core/User/enum";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  businessName: "",
  country: "",
  email: "",
  lastName: "",
  modules: [],
  name: "",
  phone: "",
  status: USER_STATUS.SUSPENDED,
  tokenSigin: "",
  type: USER_TYPES.CAJA,
  typeOfRestaurant: "",
  uniqueId: "",
};

const sessionSlicer = createSlice({
  name: "SESSION",
  initialState: INITIAL_STATE,
  reducers: {
    resetSession: () => INITIAL_STATE,
  },
});
