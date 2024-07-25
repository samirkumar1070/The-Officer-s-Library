import {Detail} from '../model/studentDetails.model.js';


const saveDetail = async (req, res) => {
    const { seatno, name, fathername, address, mobile, time, doj } = req.body;
    const newDetail = new Detail({ seatno, name, fathername, address, mobile, time, doj });
    try {
        await newDetail.save();
        res.status(201).send("Data is saved");
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("Seat number already exists in this time slot");
        } else {
            res.status(500).send("Error while saving the data");
        }
    }
};

const getDetails = async (req, res) => {
    const { time } = req.query; // Get 'time' from query parameters

    try {
        const query = time ? { time } : {}; // Filter by 'time' if provided
        const details = await Detail.find(query);
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