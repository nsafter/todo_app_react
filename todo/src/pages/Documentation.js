import "./css/Documentation.css";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="main-container">
      <h1>TODOList APP</h1>
      <div className="docuContainer">
        <p className="docuContent">
          Hello and welcome to my todolist app. My app is made using ReactJS,
          which is a JavaScript framework for front-end development.
        </p>
        <p className="docuContent">
          The app's backend section is constructed using Express and MySQL. The
          API structure is according to the RESTFul API's.
        </p>
        <p className="docuContent">Want to have a view?? Let's Go then...</p>
        <Link to="/view">
          <button className="btn btn-warning btn-lg mb-5 mt-4">
            Proceed to App <i class="fa-solid fa-arrow-right"></i>
          </button>
        </Link>
        <p className="docuContent">
          Technologies used..
          <br />
          <i class="fa-brands fa-node-js"></i>
          <i class="fa-brands fa-react"></i>
          <i class="fa-brands fa-bootstrap"></i>
          <i class="fa-solid fa-database"></i>
        </p>
        <hr />
        <p className="mt-3">Copyright &copy; 2022 | nsafter </p>
      </div>
    </div>
  );
};

export default Documentation;
