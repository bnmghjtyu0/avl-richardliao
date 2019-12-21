import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./login.scss";
import { actLogin } from "../../redux/actions";
import server from "../../server/index";

const Login = props => {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [formRegister, setFormRegister] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const _apiSignUp = async () => {
    const res = await server._apiAuth("users/register", formRegister);
    console.log("sign", res);
  };

  const _apiLogin = async () => {
    const res = await server._apiAuth("users/login", form);
    console.log("signin", res);
    if (res.data.retCode === 1) {
      localStorage.setItem("token", res.data.retData.token);
      history.push("/");
      dispatch(actLogin());
    } else {
      localStorage.removeItem("token");
    }
  };
  // const responseFacebook = response => {
  //   console.log(response);
  // };
  const responseGoogle = async response => {
    const res = await server._apiAuth("users/googleAuth", { tokenId: response.tokenId });
    if (res.data.retCode === 1) {
      localStorage.setItem("token", res.data.retData.token);
      localStorage.setItem("googleUser", JSON.stringify(response.profileObj));
      history.push("/");
      dispatch(actLogin());
    } else {
      localStorage.removeItem("token");
    }
  };
  const sendFormSignUp = async e => {
    e.preventDefault();
    _apiSignUp();
  };

  const sendFormSignIn = async e => {
    e.preventDefault();
    _apiLogin();
  };
  return (
    <div className="App-header">
      <h2 className="login-title">後台系統</h2>
      <div className="login">
        <div className="left">
          <h4>註冊</h4>
          <form onSubmit={sendFormSignUp}>
            <div className="form-group mb-2">
              <div className="mr-2">
                <input
                  className="form-control mr-2 mb-2"
                  placeholder="請輸入名稱"
                  required
                  value={formRegister.name}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      name: e.target.value
                    });
                  }}
                />
                <input
                  className="form-control mr-2 mb-2"
                  type="email"
                  placeholder="請輸入信箱"
                  required
                  value={formRegister.email}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      email: e.target.value
                    });
                  }}
                />
                <input
                  className="form-control"
                  placeholder="請輸入密碼"
                  type="password"
                  required
                  value={formRegister.password}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      password: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-sm btn-info submit">
              註冊
            </button>
          </form>
        </div>
        <div className="right">
          <h4>登入</h4>
          <form onSubmit={sendFormSignIn}>
            <div className="form-group">
              <input
                className="form-control mr-2 mb-2"
                type="email"
                placeholder="請輸入信箱"
                required
                value={form.email}
                onChange={e => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
              <input
                className="form-control"
                placeholder="請輸入密碼"
                type="password"
                required
                value={form.password}
                onChange={e => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
            </div>
            <button type="submit" className="btn btn-sm btn-success submit">
              登入
            </button>
            <GoogleLogin
              clientId="32250892194-hpgfm9jm2d7mjkho5cuvoolaumqgo7ji.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="ml-3"
            />
          </form>
        </div>
      </div>
      {/* <div className="form-inline mt-3">
        <GoogleLogin
          clientId="32250892194-hpgfm9jm2d7mjkho5cuvoolaumqgo7ji.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="mr-3"
        />
        <FacebookLogin
          appId="604731250273491"
          autoLoad={false}
          fields="name,email,picture"
          cssClass="my-facebook-button-class"
          callback={responseFacebook}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-sm btn-primary"
            >
              登入 facebook
            </button>
          )}
        />
      </div> */}
    </div>
  );
};
export default Login;
