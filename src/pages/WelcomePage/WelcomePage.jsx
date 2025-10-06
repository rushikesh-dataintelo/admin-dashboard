import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { getDashboardData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const gradientColors = [
    "from-indigo-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-blue-500 to-indigo-600",
    "from-gray-500 to-gray-700",
    "from-purple-500 to-pink-500",
    "from-teal-500 to-green-500",
  ];

  const generateCards = (data) => {
    if (!data) return [];

    const cards = [];
    let colorIndex = 0;

    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((subKey) => {
          cards.push({
            title: subKey
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            value: value[subKey],
            color: gradientColors[colorIndex % gradientColors.length],
            link: `/${key}/${subKey}`,
          });
          colorIndex++;
        });
      } else {
        cards.push({
          title: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),
          value: value,
          color: gradientColors[colorIndex % gradientColors.length],
          link: `/${key}`,
        });
        colorIndex++;
      }
    });

    return cards;
  };

  const cards = generateCards(dashboardData);

  const breadcrumbLinks = [{ label: "Dashboard", path: "/" }];

  return (
    <BaseLayout>
      {/* Breadcrumb */}
      <Breadcrumb title="Dashboard" links={breadcrumbLinks} />

      {/* Dashboard Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-6 rounded-2xl bg-gradient-to-r ${card.color} shadow-lg text-white flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>

            <button
              onClick={() => navigate(card.link)}
              className="mt-6 self-start px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}