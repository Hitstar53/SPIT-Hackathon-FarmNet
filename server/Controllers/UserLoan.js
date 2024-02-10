import UserLoan from "../Models/UserLoan.js";

const getAllUserLoans = async (req, res) => {
    try {
        const userLoans = await UserLoan.find();
        res.status(200).json(userLoans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserLoans = async (req, res) => {
    const { id } = req.params;
    try {
        const userLoans = await UserLoan.find({ user: id });
        res.status(200).json(userLoans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUserLoan = async (req, res) => {
    const userLoan = req.body;
    const newUserLoan = new UserLoan(userLoan);
    try {
        await newUserLoan.save();
        res.status(201).json(newUserLoan);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateUserLoan = async (req, res) => {
    try {
    const { id } = req.params;
    const userLoan = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user loan with id: ${id}`);
    const updatedUserLoan = await UserLoan.findByIdAndUpdate(id, { ...userLoan, id }, { new: true });
    res.json(updatedUserLoan);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
        
    }
}

const deleteUserLoan = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user loan with id: ${id}`);
        await UserLoan.findByIdAndRemove(id);
        res.json({ message: "User Loan deleted successfully." });
    }catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { getAllUserLoans,getUserLoans, createUserLoan, updateUserLoan, deleteUserLoan };
