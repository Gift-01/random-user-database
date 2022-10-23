import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useFetch from "./Pagination/UsePagination";
import "./Home.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function Home() {
  const [name, setName] = React.useState("");
  const { loading, error, data: apiData } = useFetch(
    `https://randomuser.me/api/?results=99&seed=abc`
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (name) {
      apiData?.results &&
        setData(
          apiData?.results?.filter(
            (val) =>
              val.name?.first?.toLowerCase()?.startsWith(name) ||
              val.name?.last?.toLowerCase()?.startsWith(name)
          )
        );
    } else {
      setData([]);
    }
  }, [setData, apiData, name]);

  const [newError, setNewError] = useState("");

  useEffect(() => {
    if (name && /^[a-zA-Z]+$/.test(name) === false) {
      setNewError("You can only search for alphabets.");
    } else {
      setNewError("");
    }
  }, [name]);

  useEffect(() => {
    if (error) {
      setNewError(error);
    }
  }, [error]);

  return (
    <div>
      {/* <form> */}
      <div className="fixed">
        <h1>Search Users Database</h1>
        <p>
          Search for any user in the Users Database or{" "}
          <a href="/users">view all users</a>
        </p>
        <input
          placeholder="Search for a user..."
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="searchbar"
        />
      </div>
      <div>
        <ErrorBoundary resetKeys={[newError]} FallbackComponent={ErrorFallback}>
          {loading && name ? (
            <>Loading...</>
          ) : (
            <div className="user-grid">
              {newError ? (
                <ErrorFallback
                  error={newError}
                  resetErrorBoundary={() => setName("")}
                />
              ) : (
                data &&
                data?.map((val, index) => (
                  <div className="inner" key={index}>
                    {val && val.picture && (
                      <img
                        src={val && val.picture && val.picture.large}
                        alt="single user"
                      />
                    )}
                    <h1>
                      {val && val.name && val.name.title}{" "}
                      {val && val.name && val.name.first}{" "}
                      {val && val.name && val.name.last}
                    </h1>
                    <p>{val && val.dob && val.dob.date}</p>
                    <p>
                      {
                        (val.location && val.location.city,
                        val.location && val.location.state,
                        val.location && val.location.postCode,
                        val.location && val.location.country)
                      }
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </ErrorBoundary>
      </div>
      {/* </form> */}
    </div>
  );
}
