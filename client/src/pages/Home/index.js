import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "react-day-picker/lib/style.css";
import axios from "axios";
import moment from "moment";
import { TimeSelect } from "element-react";
import { Time, timeIsBetween } from "../../utils/config";
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
  const [startDate, setStartDate] = React.useState(
    new Date(2016, 9, 10, 14, 30)
  );
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
  // const renderTable = restDatas.map((val, idx) => {
  //   console.log(val["Sun"] === "Closed");
  //   return (
  //       <tr>
  //         <th scope="row">Big</th>
  //         <td>1</td>
  //         <td>1</td>
  //         <td>1</td>
  //         <td>1</td>
  //         <td>3</td>
  //       </tr>
  //   );
  // });
  const handleStartUpdate = startDate => {
    const hour = moment(startDate).format("HH");
    const min = moment(startDate).format("mm");
    const check = `${hour}:${min}`;
    var openTime = new Time("23:30");
    var closeTime = new Time("06:30");
    var checkTime = new Time(check);
    const isBetween = timeIsBetween(openTime, closeTime, checkTime);
    console.log(isBetween);
    // console.debug("time-select startDate update: ", startDate);
    setStartDate(startDate);
  };

  restDatas.map((v, i) => {
    if (v.Sun !== "Closed") {
      const closeTime = v.Sun.replace(/([^-]+[-])/, "").trim();
      // console.log(v[""]);
    }
  });
  return (
    <header className="App-header">
      <div className="d-flex">
        <TimeSelect
          start="00:00"
          step="00:30"
          end="24:00"
          onChange={handleStartUpdate}
          value={startDate}
          placeholder="選擇時間"
        />
      </div>
      <div className="container mt-5">
        <table className="table table-light">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col"></th>
              <th scope="col">Sun</th>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wen</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">11:00</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <th scope="row">12:00</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>

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
