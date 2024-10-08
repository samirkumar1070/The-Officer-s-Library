import LibraryPayment from '../model/libraryPayment.model.js';
import {Library} from '../model/library.model.js'

// Add payment for a user
const addUserPayment =  async (req, res) => {
  const { userId, amount, date } = req.body;
  try {
    const user = await Library.findById(userId);
    if(!user){
        return res.status(404).json({ msg: 'User not found' })
    }

    const newPayment = new LibraryPayment({
      userId,
      paymentDate: date,
      amount,
      status: 'Paid' // or any default status
    });

    const payment = await newPayment.save();
    user.payments.push(payment._id);
    await user.save();
    res.status(201).json({ message: 'Payment added successfully' });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get payment status for a user
const getUserPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payments = await LibraryPayment.find({ userId: id });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {getUserPayment,addUserPayment};
