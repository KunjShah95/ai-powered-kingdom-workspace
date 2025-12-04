import { Router } from 'express';
import { CouncilController } from '../controllers/council.controller';

const router = Router();

router.get('/', CouncilController.getAll);
router.post('/', CouncilController.create);
router.put('/:id', CouncilController.update);

export default router;
