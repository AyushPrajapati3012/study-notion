const CourseProgress = require('../models/CourseProgress');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require('../utils/secToDuration');

exports.updateProfile = async (req, res) => {
  try {
    //get data,userID
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;
    //validation
    //find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber,
      profileDetails.about = about,
      await profileDetails.save();
    //return res
    return res.status(200).json({
      success: true,
      message: 'Profile updated Successfully',
      profileDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

//delete account
exports.deleteAccount = async (req, res) => {
  try {
    //get id 
    const id = req.user.id;
    const userDetails = await User.findById(id);
    //validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    //delete profiel 
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //todo hw: unenroll user from all enrolled courses
    await User.findByIdAndDelete({ _id: id });
    //how can we schedule the job
    //cron job ?
    //return res
    return res.status(200).json({
      success: true,
      message: 'User Deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User cannot be Deleted successfully',
    })
  }
}


//
exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    const userDetails = await User.findById(id).populate('additionalDetails').exec();
    return res.status(200).json({
      success: true,
      message: 'User data fetched successfully',
      userDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: 'courseContent',
          populate: {
            path: 'subSection'
          }
        }
      })
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    userDetails = userDetails.toObject()
    let subSectionLength = 0
    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      subSectionLength = 0
      let course = userDetails.courses[i]
      for (let j = 0; j < course.courseContent.length; j++) {
        totalDurationInSeconds += course.courseContent[j].subSection.
          reduce((acc, curr) => acc + (parseInt(curr.timeDuration) || 0), 0)
        subSectionLength += course.courseContent[j].subSection.length
      }
      course.totalDuration = convertSecondsToDuration(totalDurationInSeconds)

      const courseProgress = await CourseProgress.findOne({
        courseId: course._id,
        userId: userId,
      })
      const courseProgressCount = courseProgress?.completedVideos.length || 0
      if (subSectionLength === 0){
        course.progressPercentage = 0
      }
      else if (courseProgressCount >= subSectionLength) {
        course.progressPercentage = 100
      } else {
        const multiplier = Math.pow(10, 2)
        course.progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};