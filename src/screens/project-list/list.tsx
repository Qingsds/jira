import { Button, Dropdown, Menu, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { useProjectModal } from "utils/url";
import { Project, User } from ".";

interface ListProps extends TableProps<Project> {
  users: User[];
}

const List: React.FC<ListProps> = ({ users, ...res }) => {
  const { mutate } = useEditProject();
  /* 函数的柯里化 */
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const { startEdit } = useProjectModal();
  return (
    <Table
      pagination={false}
      /* rowKey不加会报错 */
      rowKey={(columns) => columns.id}
      {...res}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onChangeCheck={pinProject(project.id)}
              />
            );
          },
        },

        {
          title: "名称",
          /* 排序 */
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          /* 根据可以查找值 */
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project, index) {
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
          render(value, project, index) {
            return (
              <span key={index}>
                {dayjs(project.created).format("YYYY-MM-DD")}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <Button
                        type={"link"}
                        onClick={() => startEdit(project.id)}
                      >
                        编辑
                      </Button>
                    </Menu.Item>
                    <Menu.Item key={"delete"}>
                      <Button type={"link"}>删除</Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type={"link"}>...</Button>
              </Dropdown>
            );
          },
        },
      ]}
    />
  );
};

export default List;
