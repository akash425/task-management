const Task = require('../models/Task');

exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProductivity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const completedTasks = await Task.countDocuments({ assignedTo: userId, status: 'Done' });
    const totalTasks = await Task.countDocuments({ assignedTo: userId });

    res.json({
      completedTasks,
      totalTasks,
      productivityRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};