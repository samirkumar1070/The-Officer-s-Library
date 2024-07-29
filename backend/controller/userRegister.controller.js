import {User} from '../model/user.model.js';

const register = async (req, res) => {
  const {email,password} = req.body;
  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({ email, password });
      await user.save();
      res.status(201).json({ msg: 'Registered Successfully' }); // Send a success response
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
}
 export {register};