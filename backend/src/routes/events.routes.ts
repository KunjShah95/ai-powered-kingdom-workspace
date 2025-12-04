import { Router } from 'express';
import { EventsController } from '../controllers/events.controller';

const router = Router();

router.get('/', EventsController.getAll);
router.post('/', EventsController.create);

export default router;
