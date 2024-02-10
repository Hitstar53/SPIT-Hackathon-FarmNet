import GivenLoans from "../Models/GivenLoans.js";

const getLoansbyLender = async (req, res) => {
    const { id } = req.params;
    try {
        const lenderLoans = await GivenLoans.find({ lender: id });
        res.status(200).json(lenderLoans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createGivenLoan = async (req, res) => {
    const givenLoan = req.body;
    const newGivenLoan = new GivenLoans(givenLoan);
    try {
        await newGivenLoan.save();
        res.status(201).json(newGivenLoan);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateGivenLoan = async (req, res) => {
    try {
    const { id } = req.params;
    const givenLoan = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No given loan with id: ${id}`);
    const updatedGivenLoan = await GivenLoans.findByIdAndUpdate(id, { ...givenLoan, id }, { new: true });
    res.json(updatedGivenLoan);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
        
    }
}

const deleteGivenLoan = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No given loan with id: ${id}`);
        await GivenLoans.findByIdAndRemove(id);
        res.json({ message: "Given Loan deleted successfully." });
    }catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { getLoansbyLender, createGivenLoan, updateGivenLoan, deleteGivenLoan };



