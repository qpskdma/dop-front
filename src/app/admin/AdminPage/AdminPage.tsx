import React, { useState, useEffect } from "react";
import fileSaver from "file-saver";
import ClientCard from "../ClientCard/ClientCard";
import Search from "@/components/Search/Search";
import styles from "../AdminPage/AdminPage.module.scss";
import Loader from "@/components/Loader/Loader";
import AddClientModal from "../AddClientModal/AddClientModal";
import DeleteClientModal from "../DeleteClientModal/DeleteClientModal";
import rest from "../../../../services/rest";
import DropdownServers from "@/components/DropdownServers/DropdownServers";
import { Server } from "http";
import { Config, GetClientsResponse } from "../../../../services/types";
import { Tooltip } from "react-tooltip";
import Utils from "../../../../services/utils";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const [clientsResponse, setClientsResponse] = useState<GetClientsResponse>(
    {} as GetClientsResponse
  );
  const [sortField, setSortField] = useState<keyof Config>("createdAt");
  const [sortCreateATDirection, setSortCreateADirection] = useState(true);
  const [sortLastSessionDirection, setSortLastSessionDirection] =
    useState(true);
  const [isLoading, setLoading] = useState(true);
  const [servers, setServers] = useState([] as Server[]);
  const [activeServer, setActiveServer] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [addValue, setAddValue] = useState("");
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState<Config>();
  const [isDeletionModalActive, setIsDeletionModalActive] = useState(false);

  async function fetchData() {
    if (!activeServer) return;
    try {
      const response = await rest.get(
        `/api/vpn/wg_easy/admin/get_all_clients`,
        {
          params: {
            region: activeServer,
          },
        }
      );
      setClientsResponse(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect((): any => {
    async function getServices(): Promise<void> {
      try {
        const response = await rest.get(
          "/api/vpn/wg_easy/admin/get_all_servers"
        );
        setServers(response.data);
        response.data ? setActiveServer(response.data[0].region) : undefined;
      } finally {
      }
    }
    getServices();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeServer]);

  const filteredData = clientsResponse.data?.configs.filter((element: Config) =>
    element.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedFilteredData =
    filteredData &&
    Utils.sortArrayByField(filteredData, sortField, sortCreateATDirection);

  const isUsernameTaken = () => {
    return (
      clientsResponse.data.configs.filter(
        (element: Config) => element.name == addValue
      ).length > 0
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

  const openDeletionModal = (config: Config) => {
    setIsDeletionModalActive(true);
    setDeleteConfig(config);
  };

  const changeServer = (server: string) => {
    setActiveServer(server);
    fetchData();
  };

  const getConfig = async (config: Config) => {
    try {
      await rest
        .get("/api/vpn/wg_easy/user/get_user_config", {
          params: {
            id: config.id,
            type: "config",
            region: activeServer,
          },
        })
        .then((response) => {
          fileSaver.saveAs(new Blob([response.data]), `${config.name}.conf`);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
    }
  };

  const getQR = async (config: Config) => {
    try {
      await rest
        .get("/api/vpn/wg_easy/user/get_user_config", {
          params: {
            id: config.id,
            type: "qr",
            region: activeServer,
          },
        })
        .then((response) => {
          fileSaver.saveAs(new Blob([response.data]), `${config.name}.png`);
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
          activeServer={activeServer}
          closeAddClientModal={closeAddClientModal}
          isUsernameTaken={isUsernameTaken}
          setAddValue={setAddValue}
          addValue={addValue}
        />
      )}
      {isDeletionModalActive ? (
        <DeleteClientModal
          activeServer={activeServer}
          config={deleteConfig}
          closeDeletionModal={closeDeletionModal}
        />
      ) : null}
      <div className={styles.searchContainer}>
        <DropdownServers
          servers={servers as unknown}
          activeServer={activeServer}
          changeServer={changeServer}
        />
        <Search setSearchValue={setSearchValue} searchValue={searchValue} />
        <button
          className="addBtn"
          onClick={() => setIsAddModalActive(!isAddModalActive)}
        >
          Add Client <span>+</span>
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.navTextContainer}>
          <div>User</div>
          <div
            className={styles.sortElement}
            data-tooltip-id="sortByCreation"
            data-tooltip-content="Sort by creation time"
            data-tooltip-place="top"
            onClick={() => {
              setSortField("createdAt");
              setSortCreateADirection(!sortCreateATDirection);
            }}
          >
            Create Time
            {sortCreateATDirection ? (
              <img src="/SortUp.svg"></img>
            ) : (
              <img src="/SortDown.svg"></img>
            )}
          </div>
          <div
            className={styles.sortElement}
            data-tooltip-id="sortByLastSession"
            data-tooltip-content="Sort by last session time"
            data-tooltip-place="top"
            onClick={() => {
              setSortField("latestHandshakeAt");
              setSortLastSessionDirection(!sortLastSessionDirection);
            }}
          >
            Last Session
            {sortLastSessionDirection ? (
              <img src="/SortUp.svg"></img>
            ) : (
              <img src="/SortDown.svg"></img>
            )}
          </div>
          <div>Actions</div>
        </div>
        {isLoading ? (
          <span>
            <Loader />
          </span>
        ) : null}
        {sortedFilteredData?.map((item, index) => (
          <div key={index} className={styles.cardContainer}>
            <ClientCard
              config={item}
              getConfig={getConfig}
              getQR={getQR}
              openDeletionModal={openDeletionModal}
            />
          </div>
        ))}
      </div>
      <Tooltip id="sortByCreation" />
      <Tooltip id="sortByLastSession" />
    </div>
  );
};

export default AdminPage;
