import LenderLoan from "../Models/LenderLoan.js";

const getLoansbyLender = async (req, res) => {
    const { id } = req.params;
    try {
        const lenderLoans = await LenderLoan.find({ lender: id });
        res.status(200).json(lenderLoans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createLenderLoan = async (req, res) => {
    const lenderLoan = req.body;
    const newLenderLoan = new LenderLoan(lenderLoan);
    try {
        await newLenderLoan.save();
        res.status(201).json(newLenderLoan);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateLenderLoan = async (req, res) => {
    try {
    const { id } = req.params;
    const lenderLoan = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No lender loan with id: ${id}`);
    const updatedLenderLoan = await LenderLoan.findByIdAndUpdate(id, { ...lenderLoan, id }, { new: true });
    res.json(updatedLenderLoan);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
        
    }
}

const deleteLenderLoan = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No lender loan with id: ${id}`);
        await LenderLoan.findByIdAndRemove(id);
        res.json({ message: "Lender Loan deleted successfully." });
    }catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { getLoansbyLender, createLenderLoan, updateLenderLoan, deleteLenderLoan };