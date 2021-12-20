import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  bottom?: number;
}>`
  display: flex;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) =>
    props.bottom ? props.bottom + "rem" : undefined};
  > * {
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
  margin-top: 0 !important;
  margin-bottom: 0 !important;
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageError = ({ error }: { error: Error }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={"danger"}>{error.message}</Typography.Text>
  </FullPage>
);
export const ButtonWithNoPadding = styled(Button)`
  padding: 0;
  display: flex;
  align-items: center;
`;
