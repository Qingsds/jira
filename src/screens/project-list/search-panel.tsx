import { Input, Select } from "antd";
import React from "react";
import { Param, User } from ".";

interface SearchPanelProps {
  users: User[];
  param: Param;
  setParam: (value: Param) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({ ...param, name: e.target.value });
          }}
        />
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
      </div>
    </form>
  );
};

export default SearchPanel;
