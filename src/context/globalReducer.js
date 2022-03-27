import { SET_LOADING, SET_SNACKBAR, SET_USER } from "./actions";

const initialState = {
  loading: false,
  snackBar: { state: false, message: "", severity: "error" },
  user: {},
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
      return { ...state, user: payload };
    }
    default:
      return initialState;
  }
};

export { globalReducer, initialState };
