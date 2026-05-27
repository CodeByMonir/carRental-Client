'use client';
import FleetSearchBar from "@/explorecar/SearchForCars";
import Image from "next/image";
import { PiSeatBold,PiEngine } from "react-icons/pi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { carsData } from "@/lib/data";
import { useState } from "react";
import ExplorePage from "@/explorecar/ExplorePage";


export default function ExploreCars() {
  
  const [search, setSearch] = useState("");


  

  return (
    <ExplorePage search={search} setSearch={setSearch} />
    
  );
}

