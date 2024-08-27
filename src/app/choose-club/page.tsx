"use client";
import React, { useEffect, useState } from "react";
import { getSupabase } from "../utils/supabase";
import CreateClubDialog from "@/components/dialogs/CreateClubDialog";

const Content4 = () => {
  let columnsCreated = false;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [renderModal, setRenderModal] = useState(false);
  const [teams, setTeams] = useState<any>([]);
  const supabase = getSupabase();
  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .not("image", "is", null)
      .limit(20);
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

  useEffect(() => {
    if (teams.length > 0) {
      const clubs1 = teams.slice(0, 5);
      const clubs2 = teams.slice(5, 10);
      const clubs3 = teams.slice(10, 15);
      const clubs4 = teams.slice(15, 20);

      if (!columnsCreated) {
        const container = document.getElementById("container");

        const logoLists = [clubs1, clubs2, clubs3, clubs4];
        const numberOfRows = clubs1.length;
        const numberOfColumns = 4;

        for (let i = 0; i < numberOfColumns; i++) {
          const column = document.createElement("div");
          column.className = "column";

          for (let j = 0; j < numberOfRows; j++) {
            const team = logoLists[i][j];
            const cell = document.createElement("div");
            cell.className =
              "cell bg-blue-dark border-neutral-800 m-1 border rounded-xl";
            const logo = document.createElement("img");
            logo.src = team.image; // Acceder a la propiedad de imagen del objeto del equipo

            cell.addEventListener("click", () => {
              setRenderModal(true);
              setSelectedTeam(team); // Aquí pasas el objeto del equipo completo
            });

            cell.appendChild(logo);
            column.appendChild(cell);
          }
          container?.appendChild(column);
        }

        const style = document.createElement("style");
        style.innerHTML = `
          .column {
            height: ${numberOfRows * 100}%;
            width: 25%; // Set the width to 1/4 of the section
            float: left; // Add float to make the columns stay side by side
            overflow: hidden;
          }
          
          .column:nth-child(odd) .cell {
            animation: scroll-up ${numberOfRows * 3}s linear infinite;
          }
    
          .column:nth-child(even) .cell {
            animation: scroll-down ${numberOfRows * 3}s linear infinite;
          }
      
          .cell {
            height: ${100 / (numberOfRows * 3)}%;
            animation-delay: calc(var(--i) * -1s);
            animation-duration: 300s; 
            animation-iteration-count: infinite; 
            animation-timing-function: linear; 
            animation-fill-mode: forwards;
          }
      
          @keyframes scroll-up {
            0% {
              transform: translateY(0%);
            }
            100% {
              transform: translateY(-200%);
            }
          }
    
          @keyframes scroll-down {
            0% {
              transform: translateY(-200%);
            }
            100% {
              transform: translateY(0%);
            }
          }
        `;
        document.head.appendChild(style);
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell: any, i) => {
          cell.style.setProperty("--i", i % (numberOfRows * 2));
        });
        columnsCreated = true;
      }
    }
  }, [teams]);

  const handleClose = (e: { target: any; currentTarget: any }) => {
    if (e.target === e.currentTarget) {
      setRenderModal(false);
    }
  };

  return (
    // console.log(selectedTeam),
    <div className="scroll-container snap-y-mandatory h-screen w-full overflow-x-hidden bg-gradient-to-r from-white to-pink-light">
      {selectedTeam && renderModal && (
        <div
          className="fixed inset-0 bg-transparent flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="w-1/2 bg-transparent rounded-lg shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateClubDialog
              selectedTeam={selectedTeam}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
      <div className="mx-4 flex h-screen flex-col overflow-hidden max-h-screen">
        <div
          id="content4"
          className="relative flex h-screen snap-start items-center justify-center border-t border-white"
        >
          <div className="absolute top-20 left-0 z-10 m-8 uppercase tracking-wider font-Organo text-white">
            Choose your team
          </div>
          <div
            className="container flex w-[100%] h-[100%] max-w-full"
            id="container"
          >
            <h1 className="font-Organo absolute top-1/2 left-1/2 z-10 mt-20 w-4/5 -translate-x-1/2 -translate-y-1/2 transform px-8 text-center text-2xl leading-tight text-white md:text-5xl lg:text-6xl">
              Pick your club badge to start crafting your squad and command your
              club
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content4;
