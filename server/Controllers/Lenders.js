import Lender from "../Models/Lenders.js";

const getAllLenders = async (req, res) => {
    try {
        const lenders = await Lender.find();
        res.status(200).json(lenders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const loginLender = async (req, res) => {
    const { email, password } = req.body;
    try {
        const lender = await Lender.findOne({ email: email});

        if (!lender) {
            return res.status(404).json({ message: "Lender not found" });
        
        }
        if (lender.password !== password) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        res.status(200).json(lender);
    }catch (error) {
        res.status(500).json({ message: error.message });
    
    }
}

const getLenderbyEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const lender = await Lender.findOne({ email: email });
        res.status(200).json(lender);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createLender = async (req, res) => {
    const lender = req.body;
    const newLender = new Lender(lender);
    try {
        await newLender.save();
        res.status(201).json(newLender);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateLender = async (req, res) => {
    try {
    const { id } = req.params;
    const lender = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No lender with id: ${id}`);
    const updatedLender = await Lender.findByIdAndUpdate(id, { ...lender, id }, { new: true });
    res.json(updatedLender);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
        
    }
}

const deleteLender = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No lender with id: ${id}`);
        await Lender.findByIdAndRemove(id);
        res.json({ message: "Lender deleted successfully." });
    }catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { getAllLenders, getLenderbyEmail, createLender, updateLender, deleteLender,loginLender };
