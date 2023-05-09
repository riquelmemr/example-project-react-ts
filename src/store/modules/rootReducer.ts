import { combineReducers } from "@reduxjs/toolkit";
import contactsSlice from "./contacts/contactsSlice";
import userSlice from "./user/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  contacts: contactsSlice,
});

export default rootReducer;
