import Market from "../Models/Market.js";

const getMarket = async (req, res) => {
    try {
        const market = await Market.find();
        res.status(200).json(market);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createMarket = async (req, res) => {
    const market = req.body;
    const newMarket = new Market(market);
    try {
        await newMarket.save();
        res.status(201).json(newMarket);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const updateMarket = async (req, res) => {
    const { id } = req.params;
    const market = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No market with id: ${id}`);
    const updatedMarket = await Market.findByIdAndUpdate(id, { ...market, id }, { new: true });
    res.json(updatedMarket);
};

const deleteMarket = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No market with id: ${id}`);
    await Market.findByIdAndRemove(id);
    res.json({ message: "Market deleted successfully." });
};


export { getMarket, createMarket, updateMarket, deleteMarket };