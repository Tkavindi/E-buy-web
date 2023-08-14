import React, { useState, useEffect } from "react";
import RecipeReviewCard from "./RecipeReviewCard";
import "../styles/main.css";
import axios from "axios";
import PaginationRounded from "./pagination";
import CustomLoader from "./Loader";
import { toast } from "react-toastify";

const Main = ({ handleClick, handlePdp }) => {
  const [allProducts, setAllProducts] = useState();
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false); // Added searching state

  useEffect(() => {
    (async function fetchProductList() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=100`
        );

        setAllProducts(data.products);
        setProductList(data.products);
      } catch (error) {
        console.log(`error in getting product list`, error);
        toast.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4500);
      }
    })();

    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
    setTimeout(() => {
      setLoading(false);
    }, 4500);
    setProductList(pageChangeProduct);
  }, [page]);

  useEffect(() => {
    if (sortOption === "price") {
      const sortedList = [...productList].sort((a, b) => a.price - b.price);
      setProductList(sortedList);
    } else if (sortOption === "category") {
      const sortedList = [...productList].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setProductList(sortedList);
    } else {
      setProductList(allProducts?.slice(page * 10 - 10, 10 * page));
    }
  }, [sortOption, page, allProducts]);

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
    setPage(1);
  };

  const handleResetSorting = () => {
    setSortOption("default");
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(`Error fetching categories:`, error);
      toast.error("Error fetching categories.");
    }
  };

  const fetchCategoryProducts = async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      setProductList(data.products);
    } catch (error) {
      console.log(`Error fetching category products:`, error);
      toast.error("Error fetching category products.");
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    setSearching(true);
    fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then(async res => {
        const search = await res.json();
        setProductList(search.products);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const filterProducts = (query) => {
    if (!query) {
      setProductList(allProducts?.slice(page * 10 - 10, 10 * page));
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.model.toLowerCase().includes(query.toLowerCase())
      );
      setProductList(filteredProducts);
    }
    setPage(1);
  };

  return (
    <div style={{ backgroundColor: "#FFE5B4" }}>
      {sortOption === "default" && (
        <div className="mt-5 d-flex justify-content-center">
          <PaginationRounded setPage={setPage} />
        </div>
      )}
      <div className="mt-2 d-flex align-items-center" style={{ marginBottom: "10px" }}>
        <label htmlFor="sortOption" className="me-2" style={{ backgroundColor: "orange" }}>
          Sort by:
        </label>
        <select
          id="sortOption"
          className="form-select form-select-sm"
          style={{ maxWidth: "100px" }}
          onChange={handleSortOptionChange}
          value={sortOption}
        >
          <option value="default">Default</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        {sortOption === "category" && (
          <div className="ms-2">
            {categories.map((category) => (
              <button
                key={category}
                className="btn btn-primary btn-sm me-2 category-button"
                onClick={() => fetchCategoryProducts(category)}
                style={{ backgroundColor: "#FBCEB1", color: "black", border: `1px solid #ce2029` }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        {sortOption !== "default" && (
          <button
            className="btn btn-dark btn-sm ms-2"
            onClick={handleResetSorting}
            style={{
              padding: "5px 10px",
              border: "none",
              fontWeight: "bold",
              backgroundColor: "#ce2029",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
        <input
          type="text"
          className="form-control form-control-sm ms-2"
          placeholder="Search by model..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ maxWidth: "200px" }}
        />
        <button
          className="btn btn-primary btn-sm ms-2"
          onClick={handleSearch}
          disabled={searching}
          style={{ backgroundColor: "orange" }}
        >
          Search
        </button>
      </div>
      <section>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {productList?.map((item) => (
              <RecipeReviewCard
                key={item.id}
                item={item}
                handleClick={handleClick}
                setProductList={setProductList}
                productList={productList}
                handlePdp={handlePdp}
              />
            ))}
          </>
        )}
      </section>
      {sortOption !== "default" && (
        <div className="mt-5 d-flex justify-content-center">
          <PaginationRounded setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default Main;
