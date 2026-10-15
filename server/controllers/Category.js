const Category = require('../models/Category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: 'Category created successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//get all tags 
exports.showAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({});
        return res.status(200).json({
            success: true,
            message: "All category returned successfully",
            data: allCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//category pageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
        //get category id
        const { categoryId } = req.body;
        //get courses for specifies category id
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();
        console.log("SELECTED COURSE", selectedCategory)
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }
        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        //get courses for differnt categories
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()
        // console.log()
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)    
            .slice(0, 10)

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}