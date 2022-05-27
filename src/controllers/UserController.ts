import express, { Request, Response } from 'express';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util'; // success, fail 사용 위해
import { UserService } from '../services';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';

/**
 * @route POST /user
 * @desc Create User
 * @access Public
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  const userCreateDto: UserCreateDto = req.body;

  try {
    // 서비스 호출
    const data = await UserService.createUser(userCreateDto);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
      );
  } catch (err) {
    console.log(err);
    // 서버 내부에서 오류 발생
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userUpdateDto: UserUpdateDto = req.body;
  const { userId } = req.params;

  try {
    await UserService.updateUser(userId, userUpdateDto);

    res.status(statusCode.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 * @route GET /user/:userId
 * @desc Get User
 * @access Public
 */
const findUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const data: UserResponseDto | null = await UserService.findUserById(userId);
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 * @router DELETE /user/:userId
 * @desc Delete User
 * @access Public
 */
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await UserService.deleteUser(userId);

    res.status(statusCode.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export default {
  createUser,
  updateUser,
  findUserById,
  deleteUser,
};
