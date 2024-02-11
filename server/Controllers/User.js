import User from "../Models/User.js";

const createUser = async (req, res) => {
    try {
        const { aadhar, phoneno, name, dob, aadharimg, profileimg } = req.body;
        const user = await User.create({
        aadhar,
        phoneno,
        name,
        dob,
        aadharimg,
        profileimg,
        });
        res.status(201).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { aadhar, phoneno, firstname, lastname, dob, aadharimg, profileimg } = req.body;
        const user = await User.findOneAndUpdate(
        { aadhar },
        { aadhar, phoneno, firstname, lastname, dob, aadharimg, profileimg },
        { new: true }
        );
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { aadhar } = req.body;
        const user = await User.findOneAndDelete({ aadhar });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserByAadhar = async (req, res) => {
    try {
        const { aadhar } = req.params;
        const user = User.findOne({ aadhar });
        res.status(200).json({ user });
    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

export { createUser, getUsers, updateUser, deleteUser, getUserByAadhar };