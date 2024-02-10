import Profile from "../Models/Profile.js";

const createProfile = async (req, res) => {
    const profile = req.body;
    const newProfile = new Profile(profile);
    try {
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const profile = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);
    const updatedProfile = await Profile.findByIdAndUpdate(id, { ...profile, id }, { new: true });
    res.json(updatedProfile);
}

const deleteProfile = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);
    await Profile.findByIdAndRemove(id);
    res.json({ message: "Profile deleted successfully." });
}

const getProfilebyuser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);
    const profile = await Profile.find({ user: id });
    res.json(profile);
}


export { createProfile, getProfiles, updateProfile, deleteProfile, getProfilebyuser };
