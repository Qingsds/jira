import styled from "@emotion/styled";
import { List, Popover, Typography } from "antd";
import { useUsers } from "utils/user";

export const UsersPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();
  const content = (
    <Container>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List loading={isLoading}>
        {users?.map((user) => {
          return <List.Item  key={user.id}>{user.name}</List.Item>;
        })}
      </List>
    </Container>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <BoldSpan style={{ cursor: "pointer" }}>组员</BoldSpan>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 16rem;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;
