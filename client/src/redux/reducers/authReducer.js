const initialState = {
  isLogin: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        isLogin: false
      };
    default:
      return state;
  }
};

export default authReducer;
