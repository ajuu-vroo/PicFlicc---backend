const cloudinary = require("cloudinary");
const Pic = require("../models/pics");

// post new pic

exports.newPic = async (req, res) => {
  const { imageString } = req.body;

  try {
    const myCloud = await cloudinary.v2.uploader.upload(imageString, {
      folder: "pics",
      quality: 60,
      // width: 150,
      // crop: "scale",
    });
    const { public_id, url } = myCloud;

    const pic = await Pic.create({
      public_id,
      url,
      user: req.user,
      caption : req.body?.caption || null
    });

    res.redirect("/");
  } catch (error) {
    res.json({ message: error.message });
  }
};

//fetch all pics

exports.allPics = async (req, res) => {
  try {
    const picsArray = await Pic.find().populate("user").sort({date:-1});

    if (!picsArray || picsArray.length === 0)
      return res.json("no pics uploaded yet");

    res.json(picsArray);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//fetch single pic

exports.singlePic = async (req, res) => {
  const { picID } = req.params;

  try {
    const pic = await Pic.findById(picID).populate("user");

    if (!pic) return res.json({ message: "No picture found!" });

    res.json(pic);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//delete a pic

exports.deletePic = async (req, res) => {
  const { picID } = req.params;

  try {
    const pic = await Pic.findById(picID);

    if (!pic) return res.json({ message: "No picture found!" });

    cloudinary.v2.uploader.destroy(pic.public_id);
    pic.remove();

    res.json({ message: "deleted successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
