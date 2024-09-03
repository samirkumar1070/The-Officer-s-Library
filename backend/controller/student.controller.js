import { Student } from '../model/student.model.js';
import { checkOverlap } from '../utils/checkOverlap.js';
import StudentPayment from '../model/studentPayment.model.js';

// Save a new student detail
const saveDetail = async (req, res) => {
    const { seatno, name, fathername, address, mobile, time, doj } = req.body;

    try {
        // Find existing students with the same seat number on the same date
        // console.log('Query parameters:', { seatno, doj, library: req.user._id });

        const existingStudents = await Student.find({ seatno, library: req.user._id });
        // console.log('Existing students:', existingStudents); // Log existing students

        // Check for overlapping time slots
        const hasOverlap = existingStudents.some(student => {
            const overlap = checkOverlap(student.time, time);
            // console.log(`Checking overlap: ${student.time} with ${time} - ${overlap}`); // Log overlap check
            return overlap;
        });

        if (hasOverlap) {
            return res.status(400).json({ message: 'A student with the same seat number already exists in an overlapping time slot.' });
        }

        const newStudent = new Student({
            seatno,
            name,
            fathername,
            address,
            mobile,
            time,
            doj,
            library: req.user._id,
            status: 'Accepted'
        });

        await newStudent.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
};



// Get student details, optionally filtering by time slot
const getDetails = async (req, res) => {
    const { time } = req.query; // Get 'time' from query parameters

    try {
        const query = { library: req.user._id, status:'Accepted'}; // Filter by user ID to ensure data segregation
        if (time) {
            query.time = time; // Add time filter if provided
        }
        const details = await Student.find(query).sort({ seatno: 1 });
        res.status(200).json(details);
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Failed to get details' });
    }
};

// Remove a student detail by ID
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send('Item not found');
        }
        
        // Delete associated payments
        await StudentPayment.deleteMany({studentId:id });

        res.status(200).send("Removed successfully");
    } catch (error) {
        console.error('Error removing data:', error);
        res.status(500).send("Error while removing data");
    }
};

// Count students by time slot
const countStudentsByTimeSlot = async (req, res) => {
    const adminId = req.user._id; // Get user ID from the authenticated user

    try {
        const countByTimeSlot = await Student.aggregate([
            { $match: { user: adminId } },
            {
                $group: {
                    _id: "$time",
                    count: { $sum: 1 }
                }
            }
        ]);
        // console.log("Count by time slot:", countByTimeSlot);
        res.status(200).json(countByTimeSlot);
    } catch (error) {
        console.error('Error in countStudentsByTimeSlot:', error);
        res.status(500).json({ error: 'Failed to count students by time slot' });
    }
};

//get pending admission requests
const getPendingRequests = async (req, res) => {
    try {
        const requests = await Student.find({library: req.user._id , status: 'Pending' }).sort({ seatno: 1 });
        res.status(200).json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//accept pending admission request
const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await Student.findByIdAndUpdate(id, { status: 'Accepted' });
        res.status(200).json({ msg: 'Admission request accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//reject pending admission request
const rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;
        // Find and delete the student record
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ msg: 'Admission request not found' });
        }
        res.status(200).json({ msg: 'Admission request rejected and student details deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


export { saveDetail, getDetails, remove, countStudentsByTimeSlot, getPendingRequests, acceptRequest, rejectRequest };