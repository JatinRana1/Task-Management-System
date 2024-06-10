const notifier = require('node-notifier');
const Task = require('../model/taskModel'); // Adjust the import to your actual Task model location

const checkTaskNotification = async () => {
  try {
    console.log('Checking task notifications...');
    const tasks = await Task.findAll({
      where: {
        status: ['Pending', 'In Progress']
      }
    });

    const currentDate = new Date();
    tasks.forEach(task => {
      const deadlineDate = new Date(task.dataValues.deadline);
      const timeDifference = deadlineDate.getTime() - currentDate.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);

      const abcd = () => {
        if (dayDifference < 1 && dayDifference > 0) { 
            // Ensure it's less than 1 day and more than 0 days
            notifier.notify({
              title: task.dataValues.title,
              message: 'You have only one day left for this task.',
              sound: true,
              wait: true,
            });
            return true
          }else{
            return false
          }
      }
    });
    
  } catch (err) {
    console.error('Error checking task notifications:', err.message);
  }
}

module.exports = { checkTaskNotification };