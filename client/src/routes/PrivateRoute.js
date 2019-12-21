import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
// import LoadingIndicator from "./Lodaing";

export class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // 是否於權限檢核中
      isAuthed: !!localStorage.getItem("token") // 是否通過權限檢核
    };
  }

  static propTypes = {
    component: PropTypes.any.isRequired
  };

  checkAuth = async () => {
    let isAuthed = !!localStorage.getItem("token");
    const { isLogin } = this.props;

    if (isLogin) {
      // 設定狀態為權限檢核中 ...
      this.setState(state => ({ ...state, isLoading: true }));

      // 與遠端 API 確認權限 ...
      // token 可以從 axios interceptor 透過 head 送到後端
      // funcCode 需要從外部取得送至後端驗證使用者是否有此功能的權限
      //   isAuthed = await api.checkAuthWithServer(funcCode);
    }

    // if (isAuthed) {
    //   // 無權限顯示提示訊息
    //   alert("無權使用，請先登入系統");
    // }

    // 更新狀態 1.檢核結束 2.檢核結果
    this.setState(state => ({
      ...state,
      isLoading: false
    }));
  };

  componentWillMount = async () => {
    await this.checkAuth();
  };

  componentWillReceiveProps = async nextProps => {
    console.log(nextProps.location.pathname)
    if (nextProps.location.pathname !== this.props.location.pathname) {
      await this.checkAuth();
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { isLoading, isAuthed } = this.state;
    return isLoading === true ? (
      <div>loading</div>
    ) : (
      <Route
        {...rest}
        exact
        render={props =>
          isAuthed ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
