import { Router } from 'express';
import UserController from '../controllers/UserController';

const router: Router = Router(); // Router 객체 불러오기

router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.get('/', UserController.findAllUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
