import { User } from '../model/user.model.js';

const registerUser = async (req, res) => {
  const { username, email, password, mobile, location } = req.body;

  // Check for valid email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  // Check if username is provided
  if (!username) {
    return res.status(400).json({ msg: 'Username is required' });
  }

  // Check if location is provided
  if (!location) {
    return res.status(400).json({ msg: 'Location is required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password, mobile, location });
    await user.save();
    res.status(201).json({ msg: 'User Registered Successfully' }); // Send a success response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export { registerUser };