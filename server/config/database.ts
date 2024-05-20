import mongoose, { ConnectOptions } from "mongoose"

export default (): void => {
  if (process.env.NODE_ENV === "production") {
    mongoose.set("debug", false)
  }
  mongoose.set("strictQuery", false)

  const dbUrl: string = process.env.DB_URL || ""

  if (!dbUrl) {
    throw new Error("Database URL is not defined in the environment variables")
  }

  const options: ConnectOptions = {
    dbName: "ecommerce",
  }

  mongoose
    .connect(dbUrl, options)
    .then(() => {
      console.log("Connected with database")
    })
    .catch((error: Error) => {
      console.log(error)
    })
}
