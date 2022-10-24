import { useState, useEffect } from "react";
import useFetch from "./UsePagination";
import { Link } from "react-router-dom";
import "./User.css";

function Users() {
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;
  const {
    loading,
    error,
    data: apiData,
  } = useFetch(`https://randomuser.me/api?results=99&seed=abc`);

  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    setTotalData(apiData?.results);
  }, [setTotalData, apiData]);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(totalData?.slice(0, 9));
  }, [setData, totalData]);

  const splitData = (page) => {
    let slicedData;
    if (page === 1) {
      slicedData = totalData && totalData.slice(0, 9);
    } else {
      slicedData =
        totalData &&
        totalData.slice(PER_PAGE * (page - 1), PER_PAGE + 9 * (page - 1));
    }
    return slicedData;
  };

  const getUserIndex = (name) => {
    return totalData.findIndex((val) => val.name === name);
  };

  useEffect(() => {
    setData(splitData(page));
    //eslint-disable-next-line
  }, [setData, page]);

  const setPrev = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const setNext = () => {
    setPage(page + 1);
  };

  const pages = 10;

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">Users Database</h1>
      <div className="user-grid">
        {data?.map((each, index) => {
          const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
          const phone = `${each.phone}`;
          const mail = `${each.email}`;
          const image = `${each.picture.medium}`;
          return (
            <div className="inner" key={index}>
              <Link
                to={`/users/${getUserIndex(each.name) + 1}`}
                state={{ data: each }}
              >
                <img src={image} alt="user" />
                <strong>
                  <p key={name.toLowerCase().replaceAll(" ", "")}>{name}</p>
                </strong>
                <p>{phone}</p>
                <p>{mail}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <p className="pagination">
        Pages: {page} of {pages}
      </p>

      <div>
        <button disabled={page <= 1} onClick={setPrev} className="prev">
          prev
        </button>

        {Array.from({ length: pages }, (value, index) => index + 1).map(
          (each, index) => (
            <button
              onClick={() => setPage(each)}
              className={page === each ? "currentPageButton" : "pageButton"}
            >
              {each}
            </button>
          )
        )}

        <button
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={setNext}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Users;
