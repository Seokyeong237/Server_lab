import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import User from '../models/User';

const createUser = async (userCreateDto: UserCreateDto) => {
  try {
    // 여기서 User는 User.ts에서 내보낸 것!, 새 document=row가 생성됨
    const user = new User({
      name: userCreateDto.name,
      phone: userCreateDto.phone,
      email: userCreateDto.email,
      age: userCreateDto.age,
      school: userCreateDto.school,
    });

    await user.save();

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

const findAllUser = async () => {
  try {
    const users = await User.find();

    return users;
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
  findAllUser,
  deleteUser,
};
