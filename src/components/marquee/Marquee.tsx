"use client";
import { getSupabase } from "@/app/utils/supabase";
import React, { useEffect, useState } from "react";

const Marquee = () => {
  const supabase = getSupabase();
  const [teams, setTeams] = useState<any>([]);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .not("image", "is", null);
    // console.log(data);
    if (error) {
      console.error("Error fetching teams:", error);
      return [];
    }

    return data;
  };

  useEffect(() => {
    const loadTeams = async () => {
      const fetchedTeams = await fetchTeams();
      setTeams(fetchedTeams);
    };

    loadTeams();
  }, []);
  const midpoint = Math.ceil(teams.length / 2);

  // Dividir el array en dos partes
  const firstHalf = teams.slice(0, midpoint);
  const secondHalf = teams.slice(midpoint);
  return (
    // console.log(teams),
    <div className="flex overflow-hidden w-full h-28 mb-2 bg-transparent">
      <div className="animate-marquee whitespace-nowrap flex">
        {firstHalf.map(
          (team: {
            id: React.Key | null | undefined;
            image: string | undefined;
            name: string | undefined;
          }) => (
            <img
              key={team.id}
              src={team.image}
              alt={team.name}
              className="mx-4 text-4xl w-24 h-24 opacity-40 mb-10 rounded-full hover:opacity-100 hover:scale-110 transition-transform duration-300"
            />
          )
        )}
      </div>
      <div className="animate-marquee2  flex">
        {secondHalf.map(
          (team: {
            id: React.Key | null | undefined;
            image: string | undefined;
            name: string | undefined;
          }) => (
            <img
              key={team.id}
              src={team.image}
              alt={team.name}
              className="mx-4 text-4xl w-24 h-24 opacity-40 mb-10 rounded-full hover:opacity-100 hover:scale-110 transition-transform duration-300"
            />
          )
        )}
      </div>
    </div>
  );
};

export default Marquee;
