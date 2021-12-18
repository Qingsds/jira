import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onChangeCheck?: (props: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onChangeCheck, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => {
        console.log(value);
        return onChangeCheck?.(!!value);
      }}
      {...restProps}
    />
  );
};
