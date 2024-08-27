"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { client } from "@/app/client";
import { fetchUserRecord, updateUserAndClub } from "@/app/utils/dbCalls";
import { useRouter } from "next/navigation";
import Spinner from "../spinner/Spinner";
import { getUserEmail } from "thirdweb/wallets/embedded";

export default function CreateClubDialog({ selectedTeam, handleClose }: any) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const email = await getUserEmail({ client });
      const data = await fetchUserRecord(email);
      setUser(data);
    };
    getUser();
  }, []);

  const assignNewClub = async () => {
    setLoading(true);
    let isClubCreated = false;

    try {
      isClubCreated = await updateUserAndClub(user.id, selectedTeam.id)
        .then(() => {
          setLoading(false);
          return true; // Devuelve verdadero si la operación fue exitosa
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario y el club: ", error);
          setLoading(false);
          return false;
        });

      if (isClubCreated) {
        router.push("/cards");
      }
    } catch (error) {
      console.error("Error en la operación de actualización: ", error);
      setLoading(false);
    }
  };

  return (
    console.log(user),
    (
      <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-1 pl-4 bg-opacity-10">
        <div className="flex justify-center items-end text-center min-h-1/2 sm:block">
          <div className="bg-white transition-opacity"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            ​
          </span>
          <div className="inline-block align-bottom bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all transform sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24  ">
              <div className="bg-black max-w-lg mx-auto mt-4 mb-4 ">
                <div className="flex flex-col items-center p-6 border-2 border-pink-dark rounded-lg ">
                  <img
                    src={selectedTeam.image}
                    alt="Selected Team"
                    className="w-16 h-16 rounded-full shadow-xl object-cover object-center"
                  />
                  <p className="mt-1 text-2xl font-Organo text-white lg:text-3xl">
                    {selectedTeam.name}
                  </p>
                  <p className="mt-6 text-base text-white text-center leading-relaxed">
                    You are about to choose that shield and name for your club
                  </p>
                  <div className="flex items-center justify-between w-full gap-4">
                    <div className="w-full mt-6">
                      <button
                        className="flex items-center justify-center w-full px-5 py-3 text-lg font-semibold text-black bg-pink-medium rounded-xl transition duration-500 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => assignNewClub()}
                      >
                        {loading ? <Spinner /> : "Choose Club"}
                      </button>
                    </div>
                    <div className="w-full mt-6">
                      <button
                        onClick={handleClose}
                        className="flex items-center justify-center w-full px-5 py-3 text-lg font-medium text-black bg-white rounded-xl transition duration-500 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
