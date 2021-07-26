import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/TrelloClone";

// const url: string | undefined = process.env.DATABASE_URL;
//   ? process.env.DATABASE_URL
//   : "mongodb://127.0.0.1:27017/TrelloClone";

export const connectDB = async () => {
    try {
        if (url) {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`Database connect success`);
        } else {
            console.log(`url database error`);
        }
    } catch (error) {
        console.log(`Connect database error!!!!!!!!`);
        process.exit(1);
    }
};
