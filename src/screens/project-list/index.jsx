import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const debounceParam = useDebounce(param, 1000);

  useEffect(() => {
    fetch(
      `${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
