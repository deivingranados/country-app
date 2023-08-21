"use client";
import HomePage from "./HomePage/homePage";
import { useTheme } from "next-themes";

const Home = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      style={{
        backgroundColor:
          theme === "dark" ? "hsl(207,26%,17%)" : "hsl(0,0%,98%)",
      }}
    >
      <HomePage />
    </div>
  );
};

export default Home;
