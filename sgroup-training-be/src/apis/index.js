// export * from './users/user.router'

import express from 'express';
import userRoute  from './users/user.router.js';
import authRoute from './auth/auth.router.js';
import pollRoute from './poll/poll.router.js'

// import productRoute from './products/product.router.js';
const router = express.Router();

router.use('/users' ,userRoute);
// router.use('/products' ,productRoute);
router.use('/auth' ,authRoute);
router.use('/poll',pollRoute);


export default router;