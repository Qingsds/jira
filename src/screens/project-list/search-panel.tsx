/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import React from "react";
import { User } from ".";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (value: SearchPanelProps["param"]) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
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
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
