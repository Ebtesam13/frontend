import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTable } from "../../Store/action";
import "./Fetchdata.css";
import { FilterCard } from "../../Components/Customer/FilterCard";
import all_cat from "../../Images/all.jpg";
import ReactPaginate from "react-paginate";
import { ListCard } from "../../Components/Customer/ListCard";
import { GridCard } from "../../Components/Customer/GridCard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [catName, setCatName] = useState("ALL");
  const [all, setAll] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const searchQ = useSelector((state) => state.searchStatement);
  const [pageCount, setPageCount] = useState();
  const [view, setView] = useState("list");

  const dispatch = useDispatch();
  const location = useLocation();

  // Get the value of a specific query parameter
  const searchParams = new URLSearchParams(location.search);

  // Get all the query parameters as an object
  const allParams = Object.fromEntries(searchParams);
  dispatch(setTable([allParams.id, allParams.number]));
  console.log(allParams.number);
  const handlePageChange = (selectedObject) => {
    handleFetch(selectedObject.selected);
  };

  const handleFetch = async (pg) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/AllItems?page=${pg}`
      );
      setData(response.data.data);
      console.log(response.data.data);
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          addons: item.addons?.map((addon) => ({
            ...addon,
            quant: 1,
          })),
        }))
      );
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          extras: item.extras?.map((extra) => ({
            ...extra,
            quant: 1,
          })),
        }))
      );
      setAll(response.data);
      console.log(response.data);
      setisLoaded(true);
      setLoading(false);
      setPageCount(response.data.pagination.last_page + 1);
      // setcurrentPage(response.data.pagination.current_page)
      console.log(response.data.pagination.last_page);
      console.log(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(cats.data.data);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    // const fetchData = async () => {

    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/AllItems`);
    //     console.log(response)
    //     // const addons = await axios.get('http://127.0.0.1:8000/api/addons');

    //     // setData([...response.data.data,...addons.data.data]);
    //     setData(response.data.data)
    //     setData(prevData => prevData.map(item => ({
    //       ...item,
    //       addons: item.addons?.map(addon => ({
    //         ...addon,
    //         quant: 1
    //       }))
    //     })));
    //     setData(prevData => prevData.map(item => ({
    //       ...item,
    //       extras: item.extras?.map(extra => ({
    //         ...extra,
    //         quant: 1
    //       }))
    //     })));

    //     setAll(response.data);
    //     console.log(response.data);
    //     setisLoaded(true);
    //     setLoading(false);
    //     setPageCount(response.data.pagination.last_page)
    //     console.log(response.data.pagination.last_page);
    //     console.log(data);

    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // };

    // fetchData();

    handleFetch(0);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleCategoryFilter = async (catId, pg) => {
    // .classList.remove('active')
    const els = document.getElementsByClassName("filter-button");
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove("active");
    }

    if (catId === "all") {
      document.getElementById(catId).classList.add("active");
      setFilter("all");
      setPageCount(all.pagination.last_page);
      setData(all.data);
      setCatName("ALL");
    } else {
      document.getElementById(catId.name).classList.add("active");
      categories.forEach((cat) => {
        if (cat.id === catId.id) {
          setCatName(cat.name);
        }
      });
      try {
        const catResponse = await axios.get(
          `http://127.0.0.1:8000/api/AllItems?category_id=${catId.id}?_page=${pg}`
        );
        setData(catResponse.data.data);
        setFilter(catResponse.data.data.name);
        setPageCount(catResponse.data.pagination.last_page);
      } catch (error) {}
    }
  };

  const filteredData = data.filter((pokemon) => {
    if (searchQ === "") {
      if (filter === "vegetarian") {
        console.log("vege");
        return pokemon.type === "vegetarian";
      } else if (filter === "non-vegetarian")
        return pokemon.type === "non-vegetarian";
      else return data;
    } else {
      console.log(searchQ);
      return pokemon.name.toLowerCase().includes(searchQ.toLowerCase());
    }
    return true;
  });

  const changeView = (sentView, e) => {
    document.getElementsByClassName("chgView")[0].style.color = "black";
    document.getElementsByClassName("chgView")[1].style.color = "black";
    if (sentView === "list") {
      setView("list");
      e.target.style.color = "#f5cfb8";
    } else if (sentView === "grid") {
      setView("grid");
      e.target.style.color = "#f5cfb8";
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div
        className=" d-flex justify-content-around scrollmenu"
        id="filterCards"
      >
        <FilterCard
          id="all"
          title="All"
          img={all_cat}
          filterr={() => handleCategoryFilter("all")}
        />
        {categories.map((category) => (
          <FilterCard
            id={category.name}
            title={category.name}
            img={`http://127.0.0.1:8000/storage/${category.image}`}
            filterr={() => handleCategoryFilter(category)}
          />
        ))}
      </div>

      <div className="button-container d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between ">
          <div>
            <button
              className={`custom-button ${
                filter === "non-vegetarian" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("non-vegetarian")}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrk0mSA8x2ISlFZ0mOjQS8XclNQ5U3ixbGv0F7dpC0A&s"
                style={{
                  marginRight: "5px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
                alt="All"
                className="button-icon"
              />
              Non-Veg
            </button>
            <button
              className={`custom-button ${
                filter === "vegetarian" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("vegetarian")}
            >
              <img
                src="https://i.pinimg.com/originals/f1/12/69/f11269b45e561d9612e8962bf635d2d5.png"
                alt="Veg"
                className="button-icon"
              />
              Veg
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <h2 className="header">
            <strong>{catName}</strong>
          </h2>
        </div>
        <div>
          <button className="btn " onClick={(e) => changeView("grid", e)}>
            <i className="bi bi-grid-3x2-gap-fill  view-icon chgView"></i>
          </button>

          <button className="btn" onClick={(e) => changeView("list", e)}>
            <i className="bi bi-view-list view-icon chgView"></i>
          </button>
        </div>
      </div>
      {view === "list" ? (
        filteredData.map((item) => (
          <ListCard
            image={item.image}
            name={item.name}
            id={item.id}
            description={item.description}
            meal_size_costs={item.meal_size_costs}
            item={item}
            size={item.size}
            cost={item.cost}
            addons={item.addons}
            extras={item.extras}
          />
        ))
      ) : (
        <div className="pokemon-list">
          {filteredData.map((item) => (
            <GridCard
              image={item.image}
              name={item.name}
              id={item.id}
              description={item.description}
              meal_size_costs={item.meal_size_costs}
              item={item}
              size={item.size}
              cost={item.cost}
              addons={item.addons}
              extras={item.extras}
            />
          ))}
        </div>
      )}

      {isLoaded ? (
        <div className="w-75 m-auto">
          <ReactPaginate
            pageCount={pageCount}
            pageRange={1}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"containerr"}
            previousLinkClassName={"pagee"}
            breakClassName={"pagee"}
            nextLinkClassName={"pagee"}
            pageClassName={"pagee"}
            disabledClassNae={"disabledd"}
            activeClassName={"activee"}
            previousLabel={"<<"}
            initialPage={0}
            nextLabel={">>"}
          />
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
};

export default FetchData;
