// export * from './users/user.router'

import express from 'express';
import userRoute  from './users/user.router';
import productRoute from './products/product.router';
const router = express.Router();

router.use('/users' ,userRoute);
router.use('/products' ,productRoute);


export default router;