export const Input = ({
  type = "text",
  name,
  value,
  onchange,
  onFocus,
  label,
  onblur,
  min,
  disabled,
  placeHolder,
  ...others
}) => {
  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <div className={`w-[100%]  `}>
      <div className="relative flex flex-col gap-2 mt-2 ">
      {label && <label htmlFor={name}>{label}</label>}
        <input
          className="rounded-md bg-[#FAFAFA] border border-[#13131340] py-3 px-6 outline-none"
          type={type}
          onChange={onchange}
          name={name}
          onWheel={numberInputOnWheelPreventChange}
          onFocus={onFocus}
          onBlur={onblur}
          value={value}
          id={name}
          placeholder={placeHolder}
          min={min}
          disabled={disabled}
          {...others}
        />
      </div>
    </div>
  );
};
