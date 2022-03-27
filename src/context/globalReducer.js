import {
  SET_LOADING,
  SET_SNACKBAR,
  SET_USER,
  SET_ADMIN,
  LOGOUT,
} from "./actions";

const initialState = {
  loading: false,
  snackBar: { state: false, message: "", severity: "error" },
  user: {},
  isLoggedIn: false,
};

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return { ...state, loading: payload.loading };
    }
    case SET_SNACKBAR: {
      return { ...state, snackBar: payload.snackBar };
    }
    case SET_USER: {
      return { ...state, user: payload, isLoggedIn: true };
    }
    case SET_ADMIN: {
      return { ...state, admin: payload, isLoggedIn: true };
    }
    case LOGOUT: {
      return { ...state, admin: {}, isLoggedIn: false, user: {} };
    }
    default:
      return initialState;
  }
};

export { globalReducer, initialState };
