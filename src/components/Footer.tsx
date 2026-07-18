import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-4 text-center text-xs">
        <h1 className="text-base font-bold mb-5 pb-1 border border-b border-b-white border-transparent w-24 m-auto">
          Referensi
        </h1>

        <div className="min-h-[100px] text-left px-5 max-w-5xl py-1 w-full m-auto">
          <h2 className="text-sm font-semibold leading-none">
            Ikon oleh Flaticon
          </h2>

          {[
            {
              title: "Flat Icons Design :",
              items: [
                {
                  href: "https://www.flaticon.com/free-icons/food-stall",
                  title: "food-stall icons",
                  text: "Food-stall icons created by Flat Icons Design",
                },
              ],
            },
            {
              title: "Vector Stall :",
              items: [
                {
                  href: "https://www.flaticon.com/free-icons/stickman",
                  title: "stickman icons",
                  text: "Stickman icons created by Vector Stall - Flaticon",
                },
              ],
            },
            {
              title: "doraclub :",
              items: [
                {
                  href: "https://www.flaticon.com/free-icons/meat-ball",
                  title: "meat ball icons",
                  text: "Meat ball icons created by doraclub - Flaticon",
                },
              ],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="ps-2 mt-4">{section.title}</h3>
              <div className="mb-2 ps-4">
                <ul className="list-decimal list-inside">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        title={item.title}
                        className="ps-0.5 underline underline-offset-4 hover:text-gray-400"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
