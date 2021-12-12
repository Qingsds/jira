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
        <input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({ ...param, name: e.target.value });
          }}
        />
        <select
          value={param.personId}
          onChange={(e) => {
            setParam({ ...param, personId: e.target.value });
          }}
        >
          <option value={""}>负责人</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;
