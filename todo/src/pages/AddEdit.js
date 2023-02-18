import { useState, useEffect, clearState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./css/AddEdit.css";

const AddEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  let [item, setItem] = useState("");
  let [priority, setPriority] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => {
      setItem(resp.data[0].item);
      setPriority(resp.data[0].priority);
    });
  }, [id]);

  const submitData = () => {
    item = item.trim();
    priority = priority.trim();
    if (!item || !priority) {
      toast.error("please enter a valid value!!");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", { priority, item })
          .then(() => {
            clearState("");
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("data saved successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, { priority, item })
          .then(() => {
            clearState("");
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("data updated successfully");
      }
      setTimeout(() => {
        navigate("/view");
      }, 500);
    }
  };

  return (
    <center>
      <div className="container">
        <h1>{id ? "Update Task" : "Add Task"}</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder={!id ? "enter priority" : "update priority"}
          name="priority"
          value={priority}
          style={{ width: "50%" }}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder={!id ? "enter item" : "update item"}
          name="item"
          value={item}
          style={{ width: "50%" }}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button onClick={submitData} className="btn btn-info">
          {!id ? "Save" : "Update"}
        </button>
      </div>
    </center>
  );
};

export default AddEdit;
