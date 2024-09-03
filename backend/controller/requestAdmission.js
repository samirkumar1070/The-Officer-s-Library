import { Student } from '../model/student.model.js';
import { Library } from '../model/library.model.js';
import { checkOverlap } from '../utils/checkOverlap.js';

const requestAdmission = async (req, res) => {
    const { username, seatno, name, fathername, address, mobile, time, doj } = req.body;

    try {
        // Find the library by username
        const library = await Library.findOne({username});

        if (!library) {
            return res.status(404).json({ msg: 'Library not found' });
        }

        // Check for seat overlap
        const existingStudents = await Student.find({ seatno, library: library._id });

        const hasOverlap = existingStudents.some(student => {
            const overlap = checkOverlap(student.time, time);
            return overlap;
        });

        if (hasOverlap) {
            return res.status(400).json({ message: 'A student with the same seat number already exists in an overlapping time slot.' });
        }

        // Create a new student record with status as 'Pending'
        const newStudent = new Student({
            seatno,
            name,
            fathername,
            address,
            mobile,
            time,
            doj,
            library: library._id,
            status: 'Pending'
        });

        await newStudent.save();

        // Notify the library admin about the new admission request (This could be via email or stored notifications)
        res.status(201).json({ msg: 'Admission request sent successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export { requestAdmission };
