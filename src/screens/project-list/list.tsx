import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import React from "react";
import { Project, User } from ".";

interface ListProps extends TableProps<Project> {
  users: User[];

}

const List: React.FC<ListProps> = ({users,...res }) => {
  return (
    <Table
      pagination={false}
      /* rowKey不加会报错 */
      rowKey={columns => columns.id}
      {...res}
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
          render(value, project,index) {
            return (
              <span key={index}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project,index) {
            return (
              <span key={index}>
                {dayjs(project.created).format("YYYY-MM-DD")}
              </span>
            );
          },
        },
      ]}
      
    />
  );
};

export default List;
