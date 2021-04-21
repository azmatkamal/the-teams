import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import alertReducer from "./alert-error/alertReducer";
import errorReducer from "./alert-error/errorReducer";
// import lovReducer from "./lov/reducer";
import countryReducer from "./country/reducer";
import cityReducer from "./city/reducer";
import districtReducer from "./district/reducer";

import UserReducer from "./users/reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  alerts: alertReducer,
  country: countryReducer,
  city: cityReducer,
  district: districtReducer,
  users: UserReducer,
});
