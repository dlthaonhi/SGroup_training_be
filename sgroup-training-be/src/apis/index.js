// export * from './users/user.router'

import express from 'express';
import userRoute  from './users/user.router.js';
// import productRoute from './products/product.router.js';
const router = express.Router();

router.use('/users' ,userRoute);
// router.use('/products' ,productRoute);


export default router;