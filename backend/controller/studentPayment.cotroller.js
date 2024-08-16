import StudentPayment from '../model/studentPayment.model.js';
import {Student} from '../model/student.model.js';

const addPayment = async (req, res) => {
  const { studentId, amount, paymentDate } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const newPayment = new StudentPayment({ studentId, amount, paymentDate ,status: 'Paid' });
    const payment = await newPayment.save();

    student.payments.push(payment._id);
    await student.save();

    res.status(201).json({ msg: 'Payment added successfully', payment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPayments = async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    try {
      const payments = await StudentPayment.find({studentId : id});
      res.status(200).json(payments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
export { addPayment, getPayments};
