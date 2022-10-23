import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "./Pagination/UsePagination";

const SingleUser = () => {
  const location = useLocation();
  const userData = location.state?.data;
  const [data, setData] = useState();

  const id = location.pathname.split("/")[1];
  const { loading, error, data: apiData } = useFetch(
    `https://randomuser.me/api/?results=${id}&seed=abc`
  );

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
    <div>
      <img src={data && data.picture.large} alt="single user" />
      <h1>
        {data && data.name.title} {data && data.name.first}{" "}
        {data && data.name.last}
      </h1>
      <p>{data && data.dob.date}</p>
      <p>{data && data.email}</p>
      <p>{data && data.phone}</p>
      <p>{data && data.cell}</p>
      <p>
        {data && data.location.city},{data && data.location.state},
        {data && data.location.postCode}, {data && data.location.country}
      </p>
    </div>
  );
};

export default SingleUser;
