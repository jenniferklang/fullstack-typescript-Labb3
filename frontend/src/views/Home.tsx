// Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Header from "../components/Header";
import Image1 from "../assets/diary2.jpg";
import Image2 from "../assets/exercise1.jpg";
import Image3 from "../assets/vitamins1.jpg";
// import Image4 from "../assets/food1.jpg";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center">
        <Link to="/log" className="nav-link">
          <div className="card mx-2 custom-card">
            <img
              className="card-img-top image img-fluid"
              src={Image1}
              alt="Image1"
              loading="lazy"
            />
            <div className="card-body">Hej hopppp här var de text</div>
          </div>
        </Link>
        <Link to="/log" className="nav-link">
          <div className="card mx-2 custom-card">
            <img
              className="card-img-top image img-fluid"
              src={Image2}
              alt="Image2"
              loading="lazy"
            />
            <div className="card-body">Här var de ngt annan text.....</div>
          </div>
        </Link>
        <Link to="/log" className="nav-link">
          <div className="card mx-2 custom-card img-fluid">
            <img
              className="card-img-top image"
              src={Image3}
              alt="Image3"
              loading="lazy"
            />
            <div className="card-body">Drugs any? just det ingen any...</div>
          </div>
        </Link>
        {/* <Link to="/log" className="nav-link">
          <div className="card mx-2 custom-card">
            <img
              className="card-img-top image img-fluid"
              src={Image4}
              alt="Image4"
              loading="lazy"
            />
            <div className="card-body">Fjärde bilden och texten här</div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
