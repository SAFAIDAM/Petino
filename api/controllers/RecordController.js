import Record from "../models/AdminRecordmodel.js";

export const createRecord = async (req, res, next) => {
  try {
    const { usernameAdopter, emailAdopter, PetName, PetAge, AdoptingDate } = req.body;

    const NewRecord = await Record.create({
      usernameAdopter,
      emailAdopter,
      PetName,
      PetAge,
      AdoptingDate
    });
    res.status(200).json({
      success: true,
      message: "Record created successfully",
      data: NewRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id); // Assuming you're using Mongoose for MongoDB
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    res.status(200).json({ success: true, record });
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getRecord = async (req, res) => {
  try {
    const Records = await Record.find({});
    res.json(Records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usernameAdopter, emailAdopter, PetName, PetAge, AdoptingDate } = req.body;
    const updatedFields = {};
    if (usernameAdopter) updatedFields.usernameAdopter = usernameAdopter;
    if (emailAdopter) updatedFields.emailAdopter = emailAdopter;
    if (PetName) updatedFields.PetName = PetName;
    if (PetAge) updatedFields.PetAge = PetAge;
    if (AdoptingDate) updatedFields.AdoptingDate = AdoptingDate;

    const updatedRecord = await Record.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRecord = await Record.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      data: deletedRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};