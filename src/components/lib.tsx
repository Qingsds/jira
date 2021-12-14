import styled from "@emotion/styled";

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
