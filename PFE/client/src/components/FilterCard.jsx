import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setFilterQuery } from "@/redux/JobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Tunisia", "Tunisia Cun", "Nabeul", "Sousse", "Gabes"],
  },
  {
    filterType: "Industry",
    array: ["Fronteend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["1500 LPA", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const currentSelections = prev[type] || [];

      const updatedSelections = currentSelections.includes(value)
        ? currentSelections.filter((item) => item !== value)
        : [...currentSelections, value];

      return {
        ...prev,
        [type]: updatedSelections,
      };
    });
  };
  /*Runs every time filters change.

Object.values(selectedFilters) gives you all the arrays (per category).

.flat() merges them into a single array.

.join(" ") turns it into a query string:
"Tunisia Sousse Backend Developer" */
  useEffect(() => {
    // You can combine all selected filters into a string or custom logic
    const allSelectedValues = Object.values(selectedFilters).flat();
    dispatch(setFilterQuery(allSelectedValues)); // ✅ just the array
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white p-3 rounded-md shadow">
      <h1 className="font-bold text-lg mb-4">Filter Jobs</h1>
      {filterData.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-md text-gray-700 mb-2">
            {section.filterType}
          </h2>
          {section.array.map((item, idx) => {
            const itemId = `filter-${index}-${idx}`;
            const isChecked =
              selectedFilters[section.filterType]?.includes(item) || false;

            return (
              <div className="flex items-center space-x-2 my-1" key={itemId}>
                <Checkbox
                  id={itemId}
                  checked={isChecked}
                  onCheckedChange={() => toggleFilter(section.filterType, item)}
                />
                <Label htmlFor={itemId} className="text-sm text-gray-600">
                  {item}
                </Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
