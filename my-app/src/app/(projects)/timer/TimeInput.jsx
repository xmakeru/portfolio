import React from "react";

function TimeInput({ id, label, value, onChange, onBlur, onKeyDown }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="whitespace-nowrap text-white">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="00"
        autoComplete="off"
        maxLength={2}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,2}$/.test(val)) {
            onChange(val);
          }
        }}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="w-16 text-center rounded border border-gray-600 bg-gray-700"
      />
    </div>
  );
}

export default React.memo(TimeInput);
