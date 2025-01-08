const express = require('express');
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController.jsx');
const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
