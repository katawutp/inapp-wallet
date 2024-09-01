"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { client } from "@/app/client";
import { fetchUserRecord, updateUserAndClub } from "@/app/utils/dbCalls";
import { useRouter } from "next/navigation";
import Spinner from "../spinner/Spinner";
import { getUserEmail } from "thirdweb/wallets/embedded";
import { ButtonComponent } from "../button/ButtonComponent";

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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-gray-900 rounded-lg shadow-2xl sm:max-w-xl sm:w-full">
          <div className="relative mx-auto px-6 md:px-12 lg:px-24">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex flex-col items-center p-6">
                <img
                  src={selectedTeam.image}
                  alt="Selected Team"
                  className="w-16 h-16 rounded-full shadow-lg object-cover object-center"
                />
                <p className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                  {selectedTeam.name}
                </p>
                <p className="mt-4 text-base text-white text-center leading-relaxed">
                  You are about to choose that shield and name for your club
                </p>
                <div className="flex items-center justify-between w-full gap-4 mt-6">
                  <ButtonComponent
                    family="PRIMARY"
                    className="w-full"
                    children={loading ? <Spinner /> : "Choose Club"}
                    onClick={() => assignNewClub()}
                  />
                  <ButtonComponent
                    family="TERTIARY"
                    className="w-full"
                    children="Cancel"
                    onClick={handleClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
