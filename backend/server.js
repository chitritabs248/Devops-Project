import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);
