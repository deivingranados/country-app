"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCountryFilter } from "../services/services-country";
import { FormatNumber } from "../funcions/funtions";
import { useTheme } from "next-themes";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

import "./detail.css";

const border = [
  {
    name: "germany",
  },
  {
    name: "Italy",
  },
  {
    name: "France",
  },
];

const DetailContry = () => {
  const [detailCountry, setDeatilCountry] = useState([]);
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const router = useRouter();
  const name = searchParams.get("name");

  const goToBack = () => {
    router.push("/");
  };

  useEffect(() => {
    getCountryFilter(name).then((items) => {
      setDeatilCountry(items);
    });
  }, []);

  return (
    <div className="container">
      <div
        style={{
          borderColor: theme === "dark" ? "hsl(209,23%,22%)" : "#c4baba",
          backgroundColor: theme === "dark" ? "hsl(209,23%,22%)" : "white",
        }}
        className="button-back"
        onClick={goToBack}
      >
        <BiLeftArrowAlt className="icon-back" />
        Back
      </div>
      {detailCountry ? (
        detailCountry?.map((item) => {
          return (
            <div className="container-detail">
              <div className="item">
                <img className="image-detail" src={item?.flags.png} />
              </div>
              <div className="item">
                <div className="content-text">
                  <h5 className="title">{item?.name.common}</h5>
                  <br />
                  <div className="box-left">
                    <p className="item-text">
                      Native name:
                      {Object.entries(item?.name.nativeName).map(
                        ([key, value]) => {
                          return <span>{value.common}</span>;
                        }
                      )}
                    </p>
                    <p className="item-text">
                      Population:
                      <span>{FormatNumber(item?.population)}</span>
                    </p>
                    <p className="item-text">
                      Region:<span>{item?.region}</span>
                    </p>
                    <p className="item-text">
                      Sub Region:<span>{item?.subregion}</span>
                    </p>
                    <p className="item-text">
                      Capital:<span>{item?.capital}</span>
                    </p>
                  </div>
                  <div className="box-rigth">
                    <p className="item-text">
                      Top level Domain:
                      <span>{item?.tld}</span>
                    </p>
                    <p className="item-text">
                      Currencies:
                      {Object.entries(item?.currencies).map(([key, value]) => {
                        return <span>{value.name}</span>;
                      })}
                    </p>
                    <p className="item-text">
                      Languages:
                      {Object.entries(item?.languages).map(([key, value]) => {
                        return <span>{value}</span>;
                      })}
                    </p>
                  </div>
                </div>
                <div className="box-border-conutry">
                  <div>Border Countries</div>
                  {border.map((item) => {
                    return (
                      <div>
                        <div
                          style={{
                            borderColor:
                              theme === "dark" ? "hsl(209,23%,22%)" : "#c4baba",
                            backgroundColor:
                              theme === "dark" ? "hsl(209,23%,22%)" : "white",
                          }}
                          className="button-border"
                        >
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>no data</h2>
      )}
    </div>
  );
};

export default DetailContry;
