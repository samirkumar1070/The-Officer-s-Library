import {Detail} from '../model/studentDetails.model.js';
import { checkOverlap } from '../utils/checkOverlap.js';


const saveDetail = async (req, res) => {
    const { seatno, name, fathername, address, mobile, time, doj } = req.body;

    try {
        // Check if there's any student with the same seat number in an overlapping time slot
        const existingStudents = await Detail.find({ seatno, doj });

        const hasOverlap = existingStudents.some(student => 
            checkOverlap(student.time, time)
        );

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
            doj
        });

        await newStudent.save();

        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
};

const getDetails = async (req, res) => {
    const { time } = req.query; // Get 'time' from query parameters

    try {
        const query = time ? { time } : {}; // Filter by 'time' if provided
        const details = await Detail.find(query).sort({ seatno: 1 });
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get details' });
    }
};

const remove = async (req,res)=>{
    const {id} = req.params;
    try {
        const student = await Detail.findByIdAndDelete(id,req.body);
        if (student.deletedCount === 0) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send("removed successfully");
    } catch (error) {
        res.status(500).send("error while removing data");
    }
};

const countStudentsByTimeSlot = async (req, res) => {
    try {
        const countByTimeSlot = await Detail.aggregate([
            {
                $group: {
                    _id: "$time",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(countByTimeSlot);
    } catch (error) {
        res.status(500).json({ error: 'Failed to count students by time slot' });
    }
};

export {saveDetail,getDetails,remove,countStudentsByTimeSlot};