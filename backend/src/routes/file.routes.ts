import { Router } from 'express';
import { FileController } from '../controllers/file.controller';

const router = Router();

router.get('/', FileController.listFiles);
router.get('/:filepath(*)', FileController.readFile); // Use wildcard for nested paths
router.post('/:filepath(*)', FileController.writeFile);

export default router;
