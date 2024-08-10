import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending'
  }
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
