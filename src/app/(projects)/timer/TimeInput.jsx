import React from "react";

export default function TimeInput({ id, label, value, onChange, onBlur, onKeyDown }) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min="0"
        max="59"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-lg font-mono"
        placeholder="00"
        aria-label={`Введите ${label.toLowerCase()}`}
      />
    </div>
  )
}
