import { Library } from '../model/library.model.js';
import { Student } from '../model/student.model.js';
import StudentPayment from '../model/studentPayment.model.js';
import UserPayment from '../model/libraryPayment.model.js'

const getUsers = async (req, res) => {
  try {
    const users = await Library.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const blockUser = async (req, res) => {
  const { id } = req.params;
  //console.log(`Blocking user with ID: ${id}`);
  try {
    const user = await Library.findByIdAndUpdate(id, { isActive: false });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User blocked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Library.findByIdAndUpdate(id, { isActive: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User unblocked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Find all students associated with the user
    const students = await Student.find({ user:id });
    const studentIds = students.map(student => student._id);

    // Delete all payments associated with these students
    await StudentPayment.deleteMany({ studentId: { $in: studentIds } });

    // Delete all payments directly associated with the user
    await UserPayment.deleteMany({ userId: id });

    // If there are related Students to be deleted, handled here
    await Student.deleteMany({ user: id }); 

    //delete user
    await Library.findByIdAndDelete(id);
   
    res.status(200).json({ msg: 'User removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export { getUsers, blockUser, unblockUser, removeUser };
