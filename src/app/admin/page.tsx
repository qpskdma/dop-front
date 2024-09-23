"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientCard from "./ClientCard/ClientCard";
import Search from "@/components/Search/Search";
import styles from "./ClientCard/ClientCard.module.scss";
import Loader from "@/components/Loader/Loader";
import AddClientModal from "./AddClientModal/AddClientModal";
import getCreationTime from "./getCreationTime";
import getLastSession from "./getLastSessionTime";
import DeleteClientModal from "./DeleteClientModal/DeleteClientModal";

interface pageProps {}

// let formData = new FormData();
// formData.append("username", "test@mail.ru");
// formData.append("password", "test");

interface Data {
  comment: string;
  "last-handshake": number;
  time_create: number;
}

const page: React.FC<pageProps> = ({}) => {
  const [data, setData] = useState<Array<Data>>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [addValue, setAddValue] = useState("");
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [isDeletionModalActive, setIsDeletionModalActive] = useState(false);
  const [deleteClientName, setdeleteClientName] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  const closeAddClientModal = (elementAdded: boolean) => {
    setIsAddModalActive(false);
    elementAdded && fetchData();
  };

  const filterData = data.filter((element: Data) =>
    element.comment.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isUsernameTaken = () => {
    return (
      data.filter((element: Data) => element.comment == addValue).length > 0
    );
  };

  const closeDeletionModal = (elementRemoved: boolean) => {
    setIsDeletionModalActive(false);
    elementRemoved && fetchData();
  };

  const openDeletionModal = (clientName: string) => {
    setIsDeletionModalActive(true);
    setdeleteClientName(clientName);
  };

  const getConfig = async (clientName: string) => {
    try {
      const response = await axios.get(
        "https://api.dopserver.ru/api/mikrotik/wg/get_vpn_config_client",
        {
          params: {
            name: "vpn.dopserver.ru",
            comment: clientName,
            type: "config",
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      // setLoading(false);
    }
  };

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
      {isAddModalActive && (
        <AddClientModal
          closeAddClientModal={closeAddClientModal}
          isUsernameTaken={isUsernameTaken}
          setAddValue={setAddValue}
          addValue={addValue}
        />
      )}
      <Search
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        isAddModalActive={isAddModalActive}
        setIsAddModalActive={setIsAddModalActive}
      />
      <div className={styles.container}>
        <div className={styles.navTextContainer}>
          <div>Comment</div>
          <div>Create Time</div>
          <div>Last Session</div>
          <div>Actions</div>
        </div>
        {isLoading ? <Loader /> : null}
        {isDeletionModalActive ? (
          <DeleteClientModal
            deleteClientName={deleteClientName}
            closeDeletionModal={closeDeletionModal}
          />
        ) : null}
        <div className={styles.clients}>
          {filterData.map((item, index) => (
            <div key={index}>
              <div className={styles.cardContainer}>
                <span className={styles.name}>{item["comment"]} </span>
                <span>{getCreationTime(item["time_create"])}</span>
                <span>{getLastSession(item["last-handshake"])}</span>
                <div className={styles.btnContainer}>
                  <button onClick={() => getConfig(item.comment)}>
                    Get config
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDeletionModal(item.comment)}
                  >
                    Delete client
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
