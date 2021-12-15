import { Table } from "antd";
import dayjs from "dayjs";
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
          title: "部门",
          /* 根据可以查找值 */
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, project) {
            return <span>{dayjs(project.created).format("YYYY-MM-DD")}</span>;
          },
        },
      ]}
      dataSource={list}
    />
  );
};

export default List;
