const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config(); 

//create subsections
exports.createSubSection = async(req,res) => {
    try{
        //fetch data from req body
        const{sectionId,title,description} = req.body;
        //fetch files/video for req.files
        const video = req.files.videoFile;
        //validate 
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create subsection 
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl:uploadDetails.secure_url,

        })
        //update section with subsection id
        const updatedSection = await Section.findByIdAndUpdate(
                                        {_id:sectionId},
                                        {$push:{subSection:subSectionDetails._id}},
                                        {new:true}).
                                        populate('subSection')
                                        .exec();
        //log updated seciton here, after adding populate query;
        //return req
        return res.status(200).json({
            success:true,
            message:'SubSection created successfully',
            data: updatedSection,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:error.message,
        })
    }
}
//update subsection
exports.updateSubSection = async(req,res)=>{
    try{
        const {sectionId,subSectionId,title="",description=""} = req.body;
        // const video = req.files.file;   
        
        // if(!subSectionId || !title || !timeDuration || !description || !video){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Missing parameters",
        //     })
        // }
        const subSectionDetails = await SubSection.findById({_id:subSectionId});
        if(!subSectionDetails){
            return res.status(400).json({
                success:false,
                message:"subSection not found",
            }) 
        }
        if (title !== undefined) {
        subSectionDetails.title = title
      }
  
      if (description !== undefined) {
        subSectionDetails.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSectionDetails.videoUrl = uploadDetails.secure_url
        subSectionDetails.timeDuration = `${uploadDetails.duration}`
      }
        // const videoUrl = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // subSectionDetails.title = title;
        // subSectionDetails.description = description;
        // subSectionDetails.videoUrl = videoUrl.secure_url;
        // subSectionDetails.timeDuration = timeDuration;
        await subSectionDetails.save();
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"SubSection updated successfully",
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "An error occurred while updating the section",
        })
    }
}
//delete subsection
exports.deleteSubSection = async(req,res)=>{
    try{
        //fetch subsection id from req.body
        const{sectionId,subSectionId} = req.body;
        //manually delete the subsection from section schema
        await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});
        //find subsection and delete
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
        if (!subSection) {
            return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        return res.status(200).json({
            success:true,
            message:'sub section deleted successfully',
            data:updatedSection,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'something went wrong while deleting subsection ',
        })
    }
}
