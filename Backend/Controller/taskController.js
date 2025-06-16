const db = require('../config/db');

// Get all tasks
exports.getTasks = (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new task
exports.createTask = (req, res) => {
    const { title, priority, scrollValue } = req.body; // include scrollValue

    const sql = 'INSERT INTO tasks (title, priority, scrollValue) VALUES (?, ?, ?)';
    db.query(sql, [title, priority, scrollValue], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task created successfully', taskId: result.insertId });
    });
};


// ✅ Unified update function for title or scrollValue
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, scrollValue } = req.body;

    let fields = [];
    let values = [];

    if (title !== undefined) {
        fields.push('title = ?');
        values.push(title);
    }

    if (scrollValue !== undefined) {
        fields.push('scrollValue = ?');
        values.push(scrollValue);
    }

    if (fields.length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
    }

    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task updated successfully' });
    });
};

// Delete a task
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task deleted successfully' });
    });
};
