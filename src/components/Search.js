import React, { useState } from "react";

export const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const handelSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };
  const resetInputFiled = () => {
    setSearchValue("");
  };
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputFiled();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handelSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" />
    </form>
  );
};
