import React, { memo, useEffect, useState } from "react";
import Header from "./Header";
import "./Styles.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loadData, setLoadData] = useState(5);

  const handleScroll = () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      let lastPostlength = loadData + 5;
      setLoadData(lastPostlength);
    }
  };

  const getApiData = () => {
    fetch(
      `${process.env.REACT_APP_API}/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${loadData}&rating=g`
    )
      .then((res) => res.json())
      .then((responce) => setApiData(responce.data));
  };

  const searchApiData = () => {
    fetch(
      `${process.env.REACT_APP_API}/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchText}&limit=${loadData}&offset=0&rating=g&lang=en`
    )
      .then((res) => res.json())
      .then((responce) => setApiData(responce.data));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (searchText) {
      const getData = setTimeout(() => {
        searchApiData();
      }, 2000);

      return () => clearTimeout(getData);
    } else {
      getApiData();
    }
  }, [searchText, loadData]);

  useEffect(() => {
    if (searchText) {
      setLoadData(5);
    }
  }, [searchText]);

  return (
    <>
      <Header
        onChange={(e) => setSearchText(e.target.value)}
        searchValue={searchText}
      />
      {apiData.length ? (
        apiData.map((item) => {
          return (
            <div key={item.id}>
              <b>
                <p>{item.title}</p>
              </b>
              <div className="mainCard">
                {Object.keys(item?.images)?.map((ele, i) =>
                  item?.images[ele]?.url ? (
                    <div className="card" key={i}>
                      <img
                        src={item?.images[ele]?.url}
                        width="300"
                        height="300"
                        alt={item.title}
                        className="cardImage"
                      />
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="noData">No Data</div>
      )}
    </>
  );
};

export default memo(Home);
