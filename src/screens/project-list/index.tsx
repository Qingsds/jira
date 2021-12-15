import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export interface Param {
  name?: string;
  personId?: number | string;
}

const ProjectListScreen = () => {
  const client = useHttp();
  const [param, setParam] = useState<Param>({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState<Project[]>([]);
  const debounceParam = useDebounce(param, 1000);

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam, client]);

  useMount(() => {
    /* setUsers => (data => setUsers(data)) */
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
