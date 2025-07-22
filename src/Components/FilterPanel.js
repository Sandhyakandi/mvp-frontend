import React, { useState } from 'react';
import { Checkbox } from './UI/Checkbox';
import Button from './UI/Button';
import PriceSlider from './Filter Components/PriceSlider';
import { Input } from './UI/Input';
import { Slider } from './UI/Slider';
export default function FilterPanel({ onApply }) {
  const [filters, setFilters] = useState({
    propertyType: {
    commercial: true,  
    Industrial:false,
    mixedUse: true,
    residential: false,
    },
    propertyCategory:{
    Plots: true,
    Flats: true,
    },
    price: [500000, 5000000],
    size: [2000, 50000],
    yearBuilt: [1950, 2023],
    distance: 0.5,
  });
// const [propertyCategory, setPropertyCategory] = useState({
//     Plots: true,
//     Flats: true,
   
//   });

  const [squareYards, setSquareYards] = useState("<100");
  const [acres, setAcres] = useState("<1");
  const [budget, setBudget] = useState(10);

  const handleApply = () => {
  const hasTypeSelected = Object.values(filters.propertyType).some(val => val);
  if (!hasTypeSelected) {
    alert("Please select at least one property type.");
    return;
  }

  onApply({
    filters,
    propertyCategory,
    squareYards,
    acres,
    budget,
  });
};

  return (
    <div className="p-4 space-y-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold">Filter Properties</h2>

      {/* Property Type */}
      <div>
        <label className="block font-medium mb-2">Property Type</label>
        {Object.keys(filters.propertyType).map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <Checkbox
              checked={filters.propertyType[type]}
              onCheckedChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  propertyType: { ...prev.propertyType, [type]: val },
                }))
              }
            />
          <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </div>
      <div>
         <label className="block font-medium mb-2">Property Category</label>
            {Object.entries(filters.propertyCategory).map(([key, value]) => (
        <Checkbox
          key={key}
          label={key}
          checked={value}
          onChange={(val) => setPropertyCategory({ ...propertyCategory, [key]: val })}
        />
      ))}
      </div>
<div>


{/* <PriceSlider
  minPrice={100000}     // or dynamically fetched from data
  maxPrice={10000000}
  step={50000}
  onChange={(val) =>
    setFilters((prev) => ({
      ...prev,
      price: val
    }))
  }
/> */}
<div>
<PriceSlider
  min={100000}
  max={10000000}
  step={50000}
  onChange={(val) =>
    setFilters((prev) => ({
      ...prev,
      price: val,
    }))
  }
/>
</div>

<div>
  <div>
     <label className="block font-medium mb-2">Square Yards</label>
  </div>

   <select value={squareYards} onChange={(e) => setSquareYards(e.target.value)}>
        <option value="<100">Less than 100</option>
        <option value="101-500">101 to 500</option>
        <option value=">500">Above 500</option>
      </select>

</div>
    

</div>


<div>
     <label className="block font-medium mb-2">Land in acres</label>
   <select value={squareYards} onChange={(e) => setSquareYards(e.target.value)}>
        <option value="<100">Less than 100</option>
        <option value="101-500">101 to 500</option>
        <option value=">500">Above 500</option>
      </select>

</div>

<div>
   <label className="block font-medium mb-2">Budget in lakhs</label>
   <select value={budget} onChange={(e) => setBudget(Number(e.target.value))}>
        <option value={5}>Upto 5 L</option>
        <option value={10}>Upto 10 L</option>
        <option value={25}>Upto 25 L</option>
        <option value={50}>Upto 50 L</option>
        <option value={100}>Upto 1 Cr</option>
      </select>
</div>
      {/* Price Range */}
      {/* <div>
        <label className="block font-medium mb-2">Price Range ($)</label>
        <Slider
          defaultValue={filters.price}
          min={500000}
          max={5000000}
          step={100000}
          onValueChange={(val) => setFilters((prev) => ({ ...prev, price: val }))}
        />
        <div className="text-sm mt-1">From ${filters.price[0]} to ${filters.price[1]}</div>
      </div> */}
{/* <PriceSlider/> */}
      {/* Building Size */}
      <div>
        <label className="block font-medium mb-2">Building Size (sq ft)</label>
        <Slider
          defaultValue={filters.size}
          min={2000}
          max={50000}
          step={1000}
          onValueChange={(val) => setFilters((prev) => ({ ...prev, size: val }))}
        />
        <div className="text-sm mt-1">{filters.size[0]} – {filters.size[1]} sq ft</div>
      </div>

      {/* Year Built */}
      <div>
        <label className="block font-medium mb-2">Year Built</label>
        <Slider
          defaultValue={filters.yearBuilt}
          min={1950}
          max={2023}
          step={1}
          onValueChange={(val) => setFilters((prev) => ({ ...prev, yearBuilt: val }))}
        />
        <div className="text-sm mt-1">{filters.yearBuilt[0]} – {filters.yearBuilt[1]}</div>
      </div>

      {/* Distance */}
      <div>
        <label className="block font-medium mb-2">Distance from Selection (miles)</label>
        <Input
          type="number"
          value={filters.distance}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, distance: parseFloat(e.target.value) }))
          }
          className="w-24"
        />
      </div>

      <div className="space-x-2 mt-4">
        <Button onClick={handleApply}>Apply Filters</Button>
        <Button variant="outline">Save Filter Set</Button>
      </div>
    </div>
  );
}
