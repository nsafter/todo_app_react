import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./css/Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async (e) => {
    const response = await axios.get(`http://localhost:5000/api/get`);
    setData(response.data);
  };

  const lowloadData = async (e) => {
    const response = await axios.get(`http://localhost:5000/api/get/low`);
    setData(response.data);
  };

  const middleloadData = async (e) => {
    const response = await axios.get(`http://localhost:5000/api/get/middle`);
    setData(response.data);
  };

  const highloadData = async (e) => {
    const response = await axios.get(`http://localhost:5000/api/get/high`);
    setData(response.data);
  };

  useEffect(() => {
    lowloadData();
  }, []);

  useEffect(() => {
    middleloadData();
  }, []);

  useEffect(() => {
    highloadData();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const deleteContent = (id) => {
    if (window.confirm("Are you sure for deletion??")) {
      axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("data deleted successfuly!!");
      loadData();
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <Link to={"/addItem"}>
        <button className="btn btn-dark mb-3 mt-2">
          Add new task <i class="fa-solid fa-square-plus"></i>
        </button>
      </Link>
      <button
        onClick={loadData}
        className="btn btn-info btn-lg mx-3"
        value="all"
      >
        All tasks
      </button>
      <button
        onClick={highloadData}
        className="btn btn-danger btn-sm mx-3"
        value="high"
      >
        High Priority
      </button>
      <button
        onClick={middleloadData}
        className="btn btn-warning btn-sm mx-3"
        value="middle"
      >
        Middle Priority
      </button>
      <button
        onClick={lowloadData}
        className="btn btn-success btn-sm mx-3"
        value="low"
      >
        Low Priority
      </button>
      <table className="table">
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td className="itemclass p-3">{item.item}</td>
                <td className="p-3">
                  {(() => {
                    if (item.priority === "high") {
                      return <div className="pill high">high priority</div>;
                    } else if (item.priority === "middle") {
                      return <div className="pill middle">middle priority</div>;
                    } else if (item.priority === "low") {
                      return <div className="pill low">low priority</div>;
                    }
                  })()}
                </td>
                <td className="p-3">
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-primary">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => deleteContent(item.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
