// src/utils/seed.ts
import Note from "../models/NoteSchema";
import User from "../models/UserSchema";

const seedData = async () => {
  try {
    // Check if the collection already has data
    const notesCount = await Note.countDocuments();
    if (notesCount > 0) {
      console.log("Notes collection already seeded.");
      return;
    }

    // Dummy users
    const user1 = new User({
      email: "test1@gmail.com",
      password: "test1",
    });

    const user2 = new User({
      email: "test2@gmail.com",
      password: "test2",
    });

    await user1.save();
    await user2.save();

    // Dummy notes
    const dummyNotes = [
      {
        userID: user1._id,
        name: "Note 1 (u1)",
        image: null,
        md: null,
        lastUpdated: new Date(),
      },
      {
        userID: user1._id,
        name: "Note 2 (u1)",
        image: null,
        md: null,
        lastUpdated: new Date(),
      },
      {
        userID: user2._id,
        name: "Note 1 (u2)",
        image: null,
        md: null,
        lastUpdated: new Date(),
      },
    ];

    await Note.insertMany(dummyNotes);
    console.log("Data seeded");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

export default seedData;
