import React from "react";

const SearchPanel = ({ users, param, setParam }) => {
  
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
          value={param.userId}
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
