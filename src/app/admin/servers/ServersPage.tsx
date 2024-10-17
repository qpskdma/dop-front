import React, { useState, useEffect } from "react";
import Search from "@/components/Search/Search";
import rest from "../../../../services/rest";
import { Server } from "../../../../services/types";
import { Tooltip } from "react-tooltip";
import Table from "@/components/Table/Table";
import styles from "./ServersPage.module.scss";
import AddServerModal from "./AddServerModal/AddServerModal";
import DeleteServerModal from "./DeleteServerModal/DeleteServerModal";

interface ServersPage {}

const ServersPage: React.FC<ServersPage> = ({}) => {
  const [servers, setServers] = useState([] as Server[]);
  const [searchValue, setSearchValue] = useState("");
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [serverToDelete, setServerToDelete] = useState<Server>();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  async function getServers(): Promise<void> {
    try {
      const response = await rest.get("/api/vpn/wg_easy/admin/get_all_servers");
      setServers(response.data);
      console.log(response.data);
    } finally {
    }
  }
  useEffect((): any => {
    getServers();
  }, []);

  const filteredData = servers.filter((element: Server) =>
    element.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const closeAddServerModal = (elementAdded: boolean) => {
    setIsAddModalActive(false);
    setAddValue("");
    elementAdded && getServers();
  };

  const openDeletionModal = (server: Server) => {
    setIsDeleteModalActive(true);
    setServerToDelete(server);
  };

  const closeDeleteServerModal = (elementAdded: boolean) => {
    setIsDeleteModalActive(false);
    setAddValue("");
    elementAdded && getServers();
  };

  const isServerNameTaken = () => {
    return (
      servers.filter((element: Server) => element.name == addValue).length > 0
    );
  };

  const fields: Array<string> = [
    "Id",
    "Name",
    "IP",
    "Port",
    "Region",
    "Actions",
  ];

  return (
    <>
      {isAddModalActive ? (
        <AddServerModal
          closeAddServerModal={closeAddServerModal}
          isServerNameTaken={isServerNameTaken}
          setAddValue={setAddValue}
          addValue={addValue}
        />
      ) : null}
      {isDeleteModalActive ? (
        <DeleteServerModal
          server={serverToDelete}
          closeDeleteServerModal={closeDeleteServerModal}
        />
      ) : null}
      <div className={styles.searchContainer}>
        <div></div>
        <Search setSearchValue={setSearchValue} searchValue={searchValue} />
        <button
          className="addBtn"
          onClick={() => setIsAddModalActive(!isAddModalActive)}
        >
          Add Server <span>+</span>
        </button>
      </div>
      <Table fields={fields} navColumns={6}>
        {filteredData.map((element: Server, index: number) => {
          return (
            <div className={styles.serverWrapper} key={index}>
              <div>{element.id}</div>
              <div>{element.name}</div>
              <div>{element.ip}</div>
              <div>{element.port}</div>
              <div>{element.region}</div>
              <div className="tableBtnContainer">
                <button
                  data-tooltip-id="delete"
                  data-tooltip-content="Delete"
                  data-tooltip-place="bottom"
                  className="deleteBtn"
                  onClick={() => openDeletionModal(element)}
                >
                  <img
                    width={"32px"}
                    height={"32px"}
                    src="/Delete.svg"
                    alt=""
                  />
                </button>
                <Tooltip id="delete" />
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default ServersPage;
