import React, { useState, useEffect } from "react";
import axios from "axios";
import fileSaver from "file-saver";
import ClientCard from "../ClientCard/ClientCard";
import Search from "@/components/Search/Search";
import styles from "../ClientCard/ClientCard.module.scss";
import Loader from "@/components/Loader/Loader";
import AddClientModal from "../AddClientModal/AddClientModal";
import DeleteClientModal from "../DeleteClientModal/DeleteClientModal";
import { useSelector } from "react-redux";
import { store } from "@/../store/store";
import rest from "../../../../services/rest";

interface Data {
  comment: string;
  "last-handshake": number;
  time_create: number;
}

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const [data, setData] = useState<Array<Data>>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [addValue, setAddValue] = useState("");
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [deleteClientName, setdeleteClientName] = useState("");
  const [isDeletionModalActive, setIsDeletionModalActive] = useState(false);

  const token = useSelector((state: any) => state.auth.token);
  store.subscribe(() => console.log(token));
  useEffect(() => {
    store.subscribe(() => console.log(token));
  }, [store]);

  async function fetchData() {
    try {
      const response = await rest.get(
        "/api/mikrotik/wg/get_clients?name=vpn.dopserver.ru"
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

  const filterData = data.filter((element: Data) =>
    element.comment.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isUsernameTaken = () => {
    return (
      data.filter((element: Data) => element.comment == addValue).length > 0
    );
  };

  const closeAddClientModal = (elementAdded: boolean) => {
    setIsAddModalActive(false);
    setAddValue("");
    elementAdded && fetchData();
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
      const response = await axios
        .get("https://api.dopserver.ru/api/mikrotik/wg/get_vpn_config_client", {
          params: {
            name: "vpn.dopserver.ru",
            comment: clientName,
            type: "config",
            responseType: "blob",
          },
        })
        .then((response) => {
          fileSaver.saveAs(new Blob([response.data]), `${clientName}.conf`);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
    }
  };
  return (
    <div className={styles.page}>
      {isAddModalActive && (
        <AddClientModal
          closeAddClientModal={closeAddClientModal}
          isUsernameTaken={isUsernameTaken}
          setAddValue={setAddValue}
          addValue={addValue}
        />
      )}
      {isDeletionModalActive ? (
        <DeleteClientModal
          deleteClientName={deleteClientName}
          closeDeletionModal={closeDeletionModal}
        />
      ) : null}
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
        {isLoading ? (
          <span>
            <Loader />
          </span>
        ) : null}
        {filterData.map((item, index) => (
          <div key={index} className={styles.cardContainer}>
            <ClientCard
              name={item["comment"]}
              creationTime={item["time_create"]}
              lastSession={item["last-handshake"]}
              getConfig={getConfig}
              openDeletionModal={openDeletionModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
