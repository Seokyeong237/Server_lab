import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";

const createUser = async (
  userCreateDto: UserCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    const user = new User({
      name: userCreateDto.name,
      phone: userCreateDto.phone,
      email: userCreateDto.email,
      age: userCreateDto.age,
      school: userCreateDto.school,
    });

    await user.save();

    // return user도 가능
    const data = {
      _id: user._id,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
  try {
    const updatedUser = {
      name: userUpdateDto.name,
      phone: userUpdateDto.phone,
      email: userUpdateDto.email,
      age: userUpdateDto.age,
      school: userUpdateDto.school,
    };

    await User.findByIdAndUpdate(userId, updatedUser);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findUserById = async (userId: string) => {
  try {
    const user: UserResponseDto | null = await User.findById(userId);

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (userId: string) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createUser,
  updateUser,
  findUserById,
  deleteUser,
};
