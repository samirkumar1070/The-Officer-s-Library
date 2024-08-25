import mongoose from 'mongoose';

const LibraryPaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const LibraryPayment = mongoose.model('LibraryPayment', LibraryPaymentSchema);
export default LibraryPayment;
