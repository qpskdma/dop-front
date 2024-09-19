"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientCard from "./ClientCard";
import Search from "@/components/Search";
import styles from "./ClientCard.module.css";
import Loader from "@/components/Loader";

interface pageProps {}

let formData = new FormData();
formData.append("username", "test@mail.ru");
formData.append("password", "test");

interface Data {
  name: string;
  creationTime: string;
  lastSession: string;
}

const page: React.FC<pageProps> = ({}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.dopserver.ru/api/mikrotik/wg/get_clients?name=vpn.dopserver.ru"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await axios.post(
  //         "http://10.8.0.7:8000/auth/jwt/login",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //         }
  //       );
  //       const data = response.headers["set-cookie"];
  //       console.log(data);
  //     }

  //     fetchData();
  //   }, []);

  return (
    <div>
      <Search />
      <div className={styles.container}>
        {isLoading ? <Loader /> : null}
        {data.map((item, index) => (
          <div key={index}>
            <ClientCard
              name={item["comment"]}
              creationTime={item["time_create"]}
              lastSession={item["last-handshake"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
