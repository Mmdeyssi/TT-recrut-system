// components/CategoryCarousel.jsx
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/JobSlice"; // ✅ make sure to import this

const categories = [
  { label: "UI/UX Designer", icon: "🎨" },
  { label: "Frontend Developer", icon: "💻" },
  { label: "Backend Developer", icon: "🛠️" },
  { label: "Fullstack Developer", icon: "🧑‍💻" },
  { label: "Mobile Developer", icon: "📱" },
  { label: "Cloud Engineer", icon: "☁️" },
  { label: "Game Developer", icon: "🎮" },
  { label: "IOT Engineer", icon: "📡" },
  { label: "Data Scientist", icon: "📊" },
  { label: "DevOps Engineer", icon: "⚙️" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-6xl mx-auto mt-10 px-4"
    >
      <Carousel className="w-full mb-10">
        <CarouselContent className="flex gap-4 px-2">
          {categories.map((cat, idx) => (
            <CarouselItem key={idx} className="basis-auto">
              <Button
                onClick={() => searchJobHandler(cat.label)}
                variant="outline"
                className="rounded-full px-4 py-2 flex items-center gap-2 shadow bg-white hover:bg-gray-50 transition"
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-800">
                  {cat.label}
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default CategoryCarousel;
