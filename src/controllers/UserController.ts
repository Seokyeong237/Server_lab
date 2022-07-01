import express, { Request, Response } from 'express';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import statusCode from '../modules/statusCode';
import util from '../modules/util'; // success, fail 사용 위해
import { UserService } from '../services';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import responseMessage from '../modules/responseMessage';
import User from '../models/User';

/**
 * @route POST /user
 * @desc Create User
 * @access public
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  const userCreateDto: UserCreateDto = req.body;

  try {
    // User의 _id는 서비스 단에서 만들어서 저장
    const data: PostBaseResponseDto = await UserService.createUser(
      userCreateDto
    );
    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.CREATED,
          responseMessage.CREATE_USER_SUCCESS,
          data
        )
      );
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
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
  const { userId } = req.params; // params는 url 적는 곳에 적음

  try {
    await UserService.updateUser(userId, userUpdateDto);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, responseMessage.UPDATE_USER_SUCCESS)
      );
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/** 아이디로 유저 조회
 * @route GET /user/:userId
 * @desc GET User
 * @access Public
 */
const findUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const data: UserResponseDto | null = await UserService.findUserById(userId);

    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, data)
      );
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/** 전체 유저 조회
 * @route GET /user
 * @desc GET All User
 * @access Public
 */
const findAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await UserService.findAllUser();

    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, responseMessage.READ_ALL_USER_ACCESS, data)
      );
  } catch (err) {
    console.log(err);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 * @route DELETE /user/:userId
 * @desc DELETE User
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
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export default {
  createUser,
  updateUser,
  findUserById,
  findAllUser,
  deleteUser,
};
