import { Request, Response } from "express";
import cloudinary from "cloudinary";

import layoutService from "../../services/layoutService";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

const updateBannerLayout = async (body: any) => {
  const bannerExisted: any = await layoutService.findOne("Banner");
  const { image, title, subTitle } = body;
  if (bannerExisted) {
    await cloudinary.v2.uploader.destroy(bannerExisted.image.public_id);
  }
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
  await layoutService.updateBannerLayout(banner);
};

const updateFaqLayout = async (type: string, body: any) => {
  const { faq } = body;
  await layoutService.updateFaqLayout(type, faq);
};

const updateCategoriesLayout = async (type: string, body: any) => {
  const { categories } = body;
  await layoutService.updateCategoriesLayout(type, categories);
};

const layoutUpdaters = {
  Banner: updateBannerLayout,
  FAQ: updateFaqLayout,
  Categories: updateCategoriesLayout,
};

/*
@desc     Update layout
@route    PUT /api/v1/layout/update-layout
@access   Private (Admin only)
*/
export const updateLayout = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { type } = req.body;
    const updateLayoutFunction = layoutUpdaters[type as keyof typeof layoutUpdaters];
    if (updateLayoutFunction) {
      await updateLayoutFunction(type, req.body);
    }
    res.status(200).json({
      success: true,
      message: "Layout updated successfully",
    });
  },
  { message: "Something went wrong while updating layout. Please try again." }
);
