const Section = require('../models/Section');
const Course = require('../models/Course');

//create section
exports.createSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, courseId } = req.body;
        // validate data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            })
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //update course schema
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        },
            { new: true }).populate({
                path: 'courseContent',
                populate: {
                    path: "subSection",
                },
            }).exec();

        ///todo: use populate to replace section subsection both in the updated course details
        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Unable to create section, Please try again',
        })
    }
}


//update section 
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId,courseId } = req.body;
        //validate data;
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            })
        }
        //update section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:'subSection'
            }
        }).exec()
        //return res
        return res.status(200).json({
            success: true,
            message: 'Section Updated successfully',
            data: course,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Unable to update section, Please try again',
        })
    }
}

//delete section 
exports.deleteSection = async (req, res) => {
    try {
        //fetch data - assuming we sending id in params
        const { sectionId, courseId } = req.body;
        //validate data;
        
        await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } }, { new: true });
        //update section 
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if(!section) {
            return res.status(404).json({
                success:false,
				message:"Section not Found",
			})
		}
        if(section.subSection.length > 0){
            await SubSection.deleteMany({_id: {$in: section.subSection}});
        }
        await Section.findByIdAndDelete(sectionId);
        //return res
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        return res.status(200).json({
            success: true,
            message: 'Section Deleted successfully',
            data: course
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Unable to delete section, Please try again',
        })
    }
}