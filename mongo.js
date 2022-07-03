const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Please provide us with the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Alien322:${password}@cluster0.itraezx.mongodb.net/?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log("Connected successfully!")

        const note = new Note({
            content: 'HTML is Easy',
            date: new Date(),
            important: true,
        })

        return note.save()
    })
    .then(() => {
        console.log("A note saved!")
        return mongoose.connection.close()
    })
    .catch((error) => {
        console.log("Error: ", error)
    })