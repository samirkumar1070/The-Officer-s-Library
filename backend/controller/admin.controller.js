import { User } from '../model/user.model.js';
import { Detail } from '../model/studentDetails.model.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
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
    const user = await User.findByIdAndUpdate(id, { isActive: false });
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
    const user = await User.findByIdAndUpdate(id, { isActive: true });
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
    await User.findByIdAndDelete(id);
    // If there are related student details to be deleted, handled here
    await Detail.deleteMany({ user: id }); // Assuming StudentDetail has a userId field
    res.status(200).json({ msg: 'User removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export { getUsers, blockUser, unblockUser, removeUser };
