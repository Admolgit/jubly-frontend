import React from "react";

export function SelectLimit({
  ITEMS_OPTIONS,
  itemsPerPage,
  handleItemsChange,
  text,
}: {
  ITEMS_OPTIONS: number[];
  itemsPerPage: number;
  handleItemsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  text: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <label htmlFor="itemsPerPage" className="font-medium">
          {text} per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsChange}
          className="border rounded p-1"
        >
          {ITEMS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectLimit;
