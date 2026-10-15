const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');



//create rating
exports.createRating = async(req,res)=>{
    try{
        //find user id 
        const userId = req.user.id;
        //find data 
        const {rating,review,courseId} = req.body;
        //check if user is enrolled in course or not
        const courseDetails = await Course.findOne({_id:courseId,
                                                    studentsEnrolled: {
                                                        $elemMatch: {$eq: userId}},
                                                                        });
                                                                    
        if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            })
        }
        //check if user is already review or not 
        const alreadyReview = await RatingAndReview.findOne({
                                                        user:userId,
                                                        course:courseId,
                                                     });

        if(alreadyReview){
            return res.status(403).json({
                success:false,
                message:'course is already reviewed by the user ',
            });
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            user:userId,
            course:courseId,
        });

        //update the course 
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                                    {$push:{
                                                                        ratingAndReviews: ratingReview._id,
                                                                    }},
                                                                    {new:true},
                                                                    );
        console.log(updatedCourseDetails);

        return res.status(200).json({
                success:true,
                message:'Rating and Review created successfully',
                ratingReview,
            }); 

    }catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:'Something went wrong while creating rating and review',
            });
    }
}
//getAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
        //get course id
        const {courseId} = req.body;
        //cal avg rating
        const result = await RatingAndReview.aggregate([
            {$match: {
                    course: new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:'$rating'},
            }
        }
        ])

        //return rating
        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }

            return res.status(200).json({
                success:true,
                message:'Average rating is 0, no ratings given till now',
                averageRating:0,
            })

    }catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}
//getAllRating
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating:'desc'})
                                                .populate({
                                                    path:'user',
                                                    select:'firstName lastName email image',
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:'courseName',
                                                })
                                                .exec();

        return res.status(200).json({
            success:true,
            message:'All reviews fetched successfully',
            data:allReviews,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}