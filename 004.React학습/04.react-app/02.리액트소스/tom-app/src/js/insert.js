import supabase from "./supabase";

const addUser = async () => {
  const { data, error } = await supabase.from("users").insert([
    { name: "찐친", age: 30 },
  ]);

  if (error) console.error("Error:", error);
  else console.log("Inserted:", data);
};
