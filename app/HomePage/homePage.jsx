"use client";

import React, { useEffect, useState } from "react";
import {
  getAllCountry,
  getCountryFilter,
  getCountryRegions,
} from "../services/services-country";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FormatNumber } from "../funcions/funtions";
import { AiOutlineSearch } from "react-icons/ai";
import "./homePage.css";

const HomePage = () => {
  const [listCountrys, setListCountrys] = useState([]);
  const [filter, setFilter] = useState("");
  const [region, setRegion] = useState("");
  const { theme } = useTheme();
  const router = useRouter();

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleRegion = (e) => {
    setRegion(e.target.value);
  };
  const goToCountryDetail = (name) => {
    router.push(`/detailCountry?name=${name}`);
  };

  const validateCountrys = () => {
    try {
      if (filter) {
        getCountryFilter(filter).then((items) => {
          if (items.message === "Not Found") {
            getAllCountry().then((items) => {
              setListCountrys(items);
            });
            alert(
              "The country you are looking for is not in our database, please try again."
            );
          } else {
            setListCountrys(items);
          }
        });
      } else if (region) {
        getCountryRegions(region).then((items) => {
          setListCountrys(items);
        });
      } else {
        getAllCountry().then((items) => {
          setListCountrys(items);
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  useEffect(() => {
    validateCountrys();
  }, [filter, region]);
  return (
    <div className="container">
      <div className="container-search">
        <div className="box-input">
          <AiOutlineSearch size={15} className="icon-search" />

          <input
            type="text"
            placeholder="Search for a country.."
            style={{
              borderColor: theme === "dark" ? "hsl(209,23%,22%)" : "#c4baba",
              backgroundColor:
                theme === "dark" ? "hsl(209,23%,22%)" : "hsl(0,0%,100%)",
            }}
            onChange={handleFilter}
          />
        </div>
        <div className="box-select">
          <select
            id="country"
            name="country"
            style={{
              borderColor: theme === "dark" ? "hsl(209,23%,22%)" : "#c4baba",
              backgroundColor:
                theme === "dark" ? "hsl(209,23%,22%)" : "hsl(0,0%,100%)",
            }}
            onChange={handleRegion}
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="container-card">
        {listCountrys?.map((item) => {
          return (
            <div
              className="card"
              style={{
                backgroundColor:
                  theme === "dark" ? "hsl(209,23%,22%)" : "hsl(0,0%,100%",
              }}
              onClick={() => goToCountryDetail(item?.name.common)}
            >
              <div className="content-image">
                <img className="image-country" src={item?.flags.png} />
              </div>
              <div className="content-text">
                <h5>{item?.name.common}</h5>
                <br />
                <p>
                  Population:
                  <span>{FormatNumber(item?.population)}</span>
                </p>
                <p>
                  Region:<span>{item?.region}</span>
                </p>
                <p>
                  Capital:<span>{item?.capital}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
