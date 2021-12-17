import { Select } from "antd";
import { Row } from "type";

/**
 * value 可以传入多种类型的值
 * onChange 只会回调number或undefined类型
 * 当isNaN(Number(value)) 为true时 为默认类型
 * 当选择默认类型时，onChange回调undefined
 */

type SelectProps = React.ComponentProps<typeof Select>;

interface IDSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Row | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

const IDSelect = (props: IDSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

export default IDSelect;
