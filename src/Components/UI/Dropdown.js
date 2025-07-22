import { useState } from "react";

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="text-[#1a73e8] font-semibold hover:text-[#00a3bf]">
        {label} ▾
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-10">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-[#212121] hover:bg-[#00a3bf] hover:text-white text-sm"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;