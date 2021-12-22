/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import React from "react";
import { Project } from "type/Project";
import { User } from "type/User";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (value: SearchPanelProps["param"]) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ param, setParam }) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({ ...param, name: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
          defaultOptionName={'负责人'}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
