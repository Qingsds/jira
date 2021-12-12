import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";

export interface User {
  id:number;
  name:string;
}

export interface Project {
  id:number;
  name:string;
  personId:number;
  organization:string;
  created:number;
}

export interface Param {
  name?:string;
  personId?:number|string;
}

const ProjectListScreen = () => {

  const [param, setParam] = useState<Param>({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState<Project[]>([]);
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
