import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";
import restaurantDatas from "../../api/restaurant.json";
import withLayout from "../../container/withLayout";
import logo from "../../logo.svg";
import server from "../../server/index";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const Home = () => {
  const [restDatas, setRestDatas] = React.useState(restaurantDatas);
  const [datas, setDatas] = React.useState([]);
  const [form, setForm] = React.useState({ title: "" });
  let { from } = !localStorage.getItem("token") || {
    from: { pathname: "/login" }
  };
  let history = useHistory();

  React.useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    const res = await server._apiFull("GET", "home");
    console.log(res);
    setDatas(res.data.retData);
  };

  const patchHome = async data => {
    const res = await server._apiFull("PATCH", `home/${data._id}`, [
      {
        propName: "title",
        value: form.title
      }
    ]);
    getHome();
  };
  const renderTable = restDatas.map((val, idx) => {
    return (
      <tr>
        <td>{val["Sun"]}</td>
        <td>{val["Mon"]}</td>
        <td>{val["Tue"]}</td>
        <td>{val["Wed"]}</td>
        <td>{val["Thu"]}</td>
        <td>{val["Fri"]}</td>
        <td>{val["Sat"]}</td>
      </tr>
    );
  });
  return (
    <header className="App-header">
      <div className="container">
        <table className="table table-light">
          <thead className="bg-primary text-white">
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wen</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{renderTable}</tbody>
        </table>
      </div>
      <DayPicker />
      <div>
        {datas &&
          datas.map((data, dataIdx) => {
            return (
              <div>
                <p key={data._id}>{data.title}</p>
                <div className="form-inline">
                  {/* <p key={data._id}>{data._id}</p> */}

                  <input
                    className="form-control-sm mr-3"
                    name="title"
                    onChange={e => {
                      setForm({ ...form, title: e.target.value });
                    }}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => patchHome(data)}
                  >
                    修改
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </header>
  );
};
export default withLayout(Home);
