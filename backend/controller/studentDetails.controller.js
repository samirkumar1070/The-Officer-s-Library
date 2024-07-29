import { Detail } from '../model/studentDetails.model.js';
import { checkOverlap } from '../utils/checkOverlap.js';

// Save a new student detail
const saveDetail = async (req, res) => {
    const { seatno, name, fathername, address, mobile, time, doj } = req.body;

    try {
        // Find existing students with the same seat number on the same date
        // console.log('Query parameters:', { seatno, doj, user: req.user._id });

        const existingStudents = await Detail.find({ seatno,user: req.user._id });
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

        const newStudent = new Detail({
            seatno,
            name,
            fathername,
            address,
            mobile,
            time,
            doj,
            user: req.user._id
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
        const query = { user: req.user._id }; // Filter by user ID to ensure data segregation
        if (time) {
            query.time = time; // Add time filter if provided
        }
        const details = await Detail.find(query).sort({ seatno: 1 });
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
        const student = await Detail.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send('Item not found');
        }
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
        const countByTimeSlot = await Detail.aggregate([
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


export { saveDetail, getDetails, remove, countStudentsByTimeSlot };