import Router from 'koa-router';
import documentController from '../controller/document';

const router = new Router();

router.post('/create', documentController.create);

export default router;
