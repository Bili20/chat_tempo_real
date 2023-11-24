import NavBar from "../components/navbarComponents/navBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://192.168.155.19:3002/pessoa");

      const data = response.data;

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <NavBar />;
};

export default Home;
