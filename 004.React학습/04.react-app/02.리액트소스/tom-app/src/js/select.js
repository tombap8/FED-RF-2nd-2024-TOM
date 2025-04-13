const getUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
  
    if (error) console.error("Error:", error);
    else console.log("Fetched Users:", data);
  };
  