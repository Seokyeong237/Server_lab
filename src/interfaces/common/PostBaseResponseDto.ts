import mongoose from 'mongoose';

export interface PostBaseResponseDto {
  _id: mongoose.Schema.Types.ObjectId; // string도 가능
}
