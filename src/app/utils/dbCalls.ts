import { getSupabase } from "./supabase";

const db = getSupabase();

export const checkOrCreateUser = async (
  email: any,
  address: string | undefined
) => {
  if (email && address) {
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error fetching user:", error);
      return;
    }

    if (data.length === 0) {
      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert([{ email: email, wallet: address }]);

      if (insertError) {
        console.error("Error creating new user:", insertError);
      } else {
        console.log("New user created successfully:", newUser);
      }
    } else {
      console.log("User already exists:", data);
    }
  }
};
export const fetchUserRecord = async (email: string | undefined) => {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user record:", error);
    return null;
  }

  return data;
};

export async function updateUserAndClub(
  userId: string,
  clubId: string
): Promise<boolean> {
  try {
    const { error: updateUserError } = await db
      .from("users")
      .update({ team: clubId })
      .match({ id: userId });
    console.log(updateUserError, "updateUserError");
    if (!!updateUserError) throw updateUserError;

    const { error: updateClubError } = await db
      .from("teams")
      .update({ owner_id: userId })
      .match({ id: clubId });
    console.log(updateClubError, "clube");
    if (!!updateClubError) throw updateClubError;

    return true;
  } catch (error: any) {
    console.error("Error updating user and club:", error);
    return false;
  }
}

export async function getUserTeamByEmail(email: string): Promise<any | null> {
  try {
    // Consulta el usuario y su equipo usando el email
    const { data, error } = await db
      .from("users")
      .select("team")
      .eq("email", email)
      .single(); // single() asume que solo obtendrás una fila

    // Manejar error de la consulta
    if (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }

    // Si el usuario no tiene un equipo asignado, devuelve null
    if (!data || !data.team) {
      return null;
    }

    // Obtener la fila del equipo
    const { data: teamData, error: teamError } = await db
      .from("teams")
      .select("*")
      .eq("id", data.team)
      .single();

    // Manejar error de la consulta del equipo
    if (teamError) {
      console.error("Error fetching team:", teamError);
      return null;
    }

    // Devolver la fila del equipo
    return teamData;
  } catch (error: any) {
    console.error("Error fetching user team by email:", error);
    return null;
  }
}
