import * as Slider from "@radix-ui/react-slider";
import React, { useState } from "react";

const PriceSlider = ({ min = 100000, max = 10000000, step = 50000, onChange }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (val) => {
    setValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label className="block font-medium mb-2">Price Range (₹)</label>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        {value.map((_, i) => (
          <Slider.Thumb
            key={i}
            className="block w-5 h-5 bg-blue-600 hover:bg-blue-700 border-2 border-white rounded-full shadow-md transition"
          />
        ))}
      </Slider.Root>

      <div className="text-sm mt-1">
        {/* ₹{(value[0] / 100000).toFixed(1)}L  -  ₹{(value[1] / 100000).toFixed(1)}L */}
      Up to ₹{(value[1] / 100000).toFixed(1)}L
      </div>
    </div>
  );
};

export default PriceSlider;
