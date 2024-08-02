import { Router } from 'express';
import { SampleController } from '../controllers/sample.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';
import multer from 'multer';

const router = Router();
const sampleController = new SampleController();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', sampleController.register.bind(sampleController));
router.post('/login', sampleController.login.bind(sampleController));
router.put('/user', authenticateJWT, upload.single('profileImage'), sampleController.updateUser.bind(sampleController));
router.get('/user', authenticateJWT, sampleController.getUser.bind(sampleController));

router.post('/events', authenticateJWT, authorizeRoles(1 /* organizer role ID */), sampleController.createEvent.bind(sampleController));
router.get('/events', authenticateJWT, sampleController.getEvents.bind(sampleController));  // Only authenticated users can get events
router.put('/events/:id', authenticateJWT, authorizeRoles(1 /* organizer role ID */), (req, res) => {
  const id = parseInt(req.params.id, 10);
  sampleController.updateEvent(req, res, id);
});
router.delete('/events/:id', authenticateJWT, authorizeRoles(1 /* organizer role ID */), (req, res) => {
  const id = parseInt(req.params.id, 10);
  sampleController.deleteEvent(req, res, id);
});

router.get('/registrations', authenticateJWT, authorizeRoles(1 /* organizer role ID */), sampleController.getRegistrations.bind(sampleController));
router.get('/transactions', authenticateJWT, authorizeRoles(1 /* organizer role ID */), sampleController.getTransactions.bind(sampleController));
router.get('/statistics', authenticateJWT, authorizeRoles(1 /* organizer role ID */), sampleController.getStatistics.bind(sampleController));
router.get('/reports', authenticateJWT, authorizeRoles(1 /* organizer role ID */), sampleController.getReports.bind(sampleController));
router.get('/user', authenticateJWT, sampleController.getUser.bind(sampleController));
router.put('/user', authenticateJWT, sampleController.updateUser.bind(sampleController));

export default router;
