import {Admin} from '../model/adminRegister.model.js';

const register = async (req, res) => {
  const {email,password} = req.body;
  try {
      let admin = await Admin.findOne({ email });
      if (admin) {
          return res.status(400).json({ msg: 'Admin already exists' });
      }
      admin = new Admin({ email, password });
      await admin.save();
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
}
 export {register};