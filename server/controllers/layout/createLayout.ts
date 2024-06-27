import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";

import layoutService from "../../services/layoutService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";

const createBannerLayout = async (body: any) => {
  const { image, title, subTitle } = body;
  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "layouts",
  });
  const banner = {
    type: "Banner",
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    title,
    subTitle,
  };
  await layoutService.createBannerLayout(banner);
};

const createFaqLayout = async (type: string, body: any) => {
  const { faq } = body;
  await layoutService.createFaqLayout(type, faq);
};

const createCategoriesLayout = async (type: string, body: any) => {
  console.log("createCategoriesLayout");
  const { categories } = body;
  await layoutService.createCategoriesLayout(type, categories);
};

const layoutCreators = {
  Banner: createBannerLayout,
  FAQ: createFaqLayout,
  Categories: createCategoriesLayout,
};

/*
@desc     Create layout
@route    POST /api/v1/layout/create-layout
@access   Private (Admin only)
*/
export const createLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body;
    const isTypeExist = await layoutService.findOne(type);
    if (isTypeExist) {
      return next(ApiError.badRequest("Layout already exists"));
    }
    const createLayoutFunction = layoutCreators[type as keyof typeof layoutCreators];
    if (createLayoutFunction) {
      await createLayoutFunction(type, req.body);
    } else {
      return next(ApiError.badRequest("Invalid layout type"));
    }
    res.status(200).json({
      success: true,
      message: "Layout created successfully",
    });
  },
  { message: "Something went wrong while creating layout. Please try again." }
);
