import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  // useEffect(() => handleInputChange, searchValue);
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        {/* <img width={"16px"} height={"16px"} src="/Search.svg" alt="" /> */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.73461 1.60122C5.46157 1.6022 4.24106 2.10886 3.34158 3.00973C2.4421 3.9106 1.93733 5.13189 1.93832 6.40493C1.9388 7.03527 2.06344 7.65935 2.30511 8.24152C2.54679 8.8237 2.90076 9.35258 3.34683 9.79795C3.79289 10.2433 4.32231 10.5965 4.90486 10.8373C5.48741 11.078 6.11168 11.2017 6.74202 11.2012C7.37237 11.2007 7.99645 11.0761 8.57862 10.8344C9.1608 10.5927 9.68967 10.2388 10.135 9.79271C10.5804 9.34664 10.9336 8.81722 11.1744 8.23467C11.4151 7.65212 11.5388 7.02786 11.5383 6.39751C11.5373 5.12447 11.0307 3.90396 10.1298 3.00448C9.22894 2.10501 8.00765 1.60024 6.73461 1.60122ZM2.20934 1.87923C3.40864 0.678073 5.03599 0.00253157 6.73337 0.00122027C8.43076 -9.10382e-05 10.0591 0.672935 11.2603 1.87224C12.4615 3.07155 13.137 4.69889 13.1383 6.39627C13.139 7.23673 12.9741 8.06909 12.653 8.84582C12.4344 9.37486 12.1462 9.87104 11.797 10.3216L16.1104 14.6283C16.423 14.9405 16.4234 15.447 16.1112 15.7597C15.7991 16.0723 15.2925 16.0727 14.9799 15.7605L10.6665 11.4539C10.2165 11.8037 9.72076 12.0927 9.19206 12.3122C8.41582 12.6344 7.58372 12.8006 6.74326 12.8012C5.9028 12.8019 5.07044 12.637 4.29371 12.3159C3.51698 11.9949 2.81108 11.524 2.21633 10.9302C1.62158 10.3364 1.14961 9.6312 0.827381 8.85496C0.505151 8.07873 0.338968 7.24662 0.338318 6.40616C0.337007 4.70878 1.01003 3.08039 2.20934 1.87923Z"
            fill="#1C3144"
          />
        </svg>
        <input
          type="search"
          placeholder="Search"
          className={styles.search}
          // value={searchValue}
          // onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button className={styles.addBtn}>
        Add Client <span>+</span>
      </button>
    </div>
  );
};

export default Search;
