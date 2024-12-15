import React, { useEffect, useState } from "react";
import Users from "./Users";

function UserContainer() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((userData) => {
        console.log(userData)
        setUsers(userData);
      });
  }, []);

  const visibleUsers = users.slice(currentIndex, currentIndex + 4);

  const scrollRight = () => {
    if (currentIndex + 4 < users.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const scrollLeft = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
        USERS
      </h3>

      <div className="relative w-full">
        {/* Left arrow button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ◁
        </button>

        {/* Container for the user cards, horizontally scrollable */}
        <div className="wine-container flex overflow-x-auto space-x-4 py-4 px-2">
          {visibleUsers.map((user) => (
            <div key={user.id} className="m-4 w-64">
              <Users user={user} />
            </div>
          ))}
        </div>

        {/* Right arrow button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ▷
        </button>
      </div>
    </div>
  );
}

export default UserContainer;
