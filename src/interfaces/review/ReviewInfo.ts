import mongoose from "mongoose";

export interface ReviewInfo {
  writer: mongoose.Types.ObjectId; // User 참조하니까
  movie: mongoose.Types.ObjectId; // movie 참조하니까
  title: string;
  content: string;
}
