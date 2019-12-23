import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";
import CSVReader from "react-csv-reader";
import Papa from 'papaparse';
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
  const [datas, setDatas] = React.useState([]);
  const [form, setForm] = React.useState({ title: "" });
  let { from } = !localStorage.getItem("token") || {
    from: { pathname: "/login" }
  };
  let history = useHistory();
  const fetchCsv = () => {
    return fetch("/data/data.csv").then(function(response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function(result) {
        return decoder.decode(result.value);
      });
    });
  };
  const getCsvData = async () => {
    let csvData = await fetchCsv();
    console.log(csvData)
    // Papa.parse(csvData, {
    //   console.log(svgData)
    //   complete: getData
    // });
  };
  React.useEffect(() => {
    // getHome();
    getCsvData();
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
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
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
