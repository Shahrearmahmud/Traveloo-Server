import Tour from "../models/Tour.js";

//create new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create.try again",
      data: savedTour,
    });
  }
};

//update
export const updateTour = async (req, res) => {

  const id = req.params.id
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, {
      $set: req.body
    }, { new: true })
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",

    });
  }
};

//delete
export const deleteTour = async (req, res) => {
  const id = req.params.id
  try {
    await Tour.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",

    });
  }
};


//getSingle
export const getSingleTour = async (req, res) => {
  const id = req.params.id
  try {
    const tour = await Tour.findById(id)
    res.status(200).json({
      success: true,
      message: "Get the tour Successfully ",
      data: tour,
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",

    });
  }
};

//getAll
export const getAllTour = async (req, res) => {

  //for pagination
  const page = parseInt(req.query.page)
  console.log(page)
  try {
    const tours = await Tour.find({})
    res.status(200).json({
      success: true,
      message: "Get All Tours Successfully",
      data: tours
    });

  } catch (err) {
    res.status().json({
      success: false,
      message: "sorry not found",

    });
  }
};

