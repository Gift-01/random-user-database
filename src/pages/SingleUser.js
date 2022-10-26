import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "./Pagination/UsePagination";
import "./SingleUser.css";

const SingleUser = () => {
  const location = useLocation();
  const userData = location.state?.data;
  const [data, setData] = useState();

  const id = location.pathname.split("/")[1];
  const {
    loading,
    error,
    data: apiData,
  } = useFetch(`https://randomuser.me/api/?results=${id}&seed=abc`);

  useEffect(() => {
    if (!userData) {
      if (apiData?.results) {
        setData(apiData?.results[apiData?.results?.length - 1]);
      }
    } else {
      setData(userData);
    }
  }, [userData, setData, apiData]);

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>{error}</>;
  }

  return (
    <div className="container">
      <div className="userContainer">
        <img src={data && data.picture.large} alt="single user" />
        <h1>
          <strong className="identity"> Name: </strong>{" "}
          {data && data.name.title} {data && data.name.first}{" "}
          {data && data.name.last}
        </h1>
        <p>
          <strong className="identity"> Date of Birth:</strong>{" "}
          {data && data.dob.date}
        </p>
        <p>
          {" "}
          <strong className="identity">Email:</strong> {data && data.email}
        </p>
        <p>
          <strong className="identity">Phone:</strong> {data && data.phone}
        </p>
        <p>
          <strong className="identity">Cell:</strong> {data && data.cell}
        </p>
        <p>
          <strong className="identity">Address:</strong> {"  "}{" "}
          {data && data.location.city},{data && data.location.state},
          {data && data.location.postcode ? `${data.location.postcode},` : ""}{" "}
          {data && data.location.country}
        </p>
      </div>
    </div>
  );
};

export default SingleUser;
