import React, { useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setFilterQuery } from "@/redux/JobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Tunisia", "Nabeul", "Sousse", "Gabes"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Embedded Developer",
      "IoT Engineer",
    ],
  },
];

const FilterCard = ({ selectedFilters, setSelectedFilters }) => {
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

  useEffect(() => {
    const allSelectedValues = Object.values(selectedFilters).flat();
    dispatch(setFilterQuery(allSelectedValues));
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-md border border-gray-200">
      <h1 className="font-bold text-xl text-gray-800 mb-6">Filter Jobs</h1>
      {filterData.map((section, index) => (
        <div
          key={index}
          className="mb-6 pb-4 border-b last:border-b-0 last:pb-0 last:mb-0 border-gray-200"
        >
          <h2 className="font-semibold text-md text-gray-700 mb-3">
            {section.filterType}
          </h2>
          <div className="space-y-2">
            {section.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              const isChecked =
                selectedFilters[section.filterType]?.includes(item) || false;

              return (
                <div
                  className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded-md transition"
                  key={itemId}
                >
                  <Checkbox
                    id={itemId}
                    checked={isChecked}
                    onCheckedChange={() =>
                      toggleFilter(section.filterType, item)
                    }
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
