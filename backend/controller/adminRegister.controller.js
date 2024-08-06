import { Admin } from '../model/admin.model.js';

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }
    // Create new admin
    const admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export { registerAdmin };