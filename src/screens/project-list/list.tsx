import { Table } from "antd";
import React from "react";
import { Project, User } from ".";

interface ListProps {
  list: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          /* 根据可以查找值 */
          dataIndex: "name",
          /* 排序 */
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};

export default List;
