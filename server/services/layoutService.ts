import LayoutRepo from "../models/layoutModel";

const findOne = async (type: string) => {
  return await LayoutRepo.findOne({ type });
};

const createFaqLayout = async (type: string, faq: any) => {
  const faqItems = await Promise.all(
    faq.map(async (item: any) => {
      return {
        question: item.question,
        answer: item.answer,
      };
    })
  );
  return await LayoutRepo.create({ type, faq: faqItems });
};

const createCategoriesLayout = async (type: string, categories: any) => {
  const categoryItems = await Promise.all(
    categories.map(async (item: any) => {
      return {
        title: item.title,
      };
    })
  );
  return await LayoutRepo.create({ type, categories: categoryItems });
};

const createBannerLayout = async (banner: any) => {
  return await LayoutRepo.create(banner);
};

const updateBannerLayout = async (bannerData: any) => {
  return await LayoutRepo.findOneAndUpdate(bannerData?._id, { bannerData });
};

const updateFaqLayout = async (type: string, faq: any) => {
  const faqExistedData: any = await LayoutRepo.findOne({ type });
  const faqItems = await Promise.all(
    faq.map(async (item: any) => {
      return {
        question: item.question,
        answer: item.answer,
      };
    })
  );
  return await LayoutRepo.findByIdAndUpdate(faqExistedData?._id, { type, faq: faqItems });
};

const updateCategoriesLayout = async (type: string, categories: any) => {
  console.log("categoriesExistedData");
  const categoriesExistedData: any = await LayoutRepo.findOne({ type });
  const categoryItems = await Promise.all(
    categories.map(async (item: any) => {
      return {
        title: item.title,
      };
    })
  );
  console.log("categoryItems", categoryItems);
  return await LayoutRepo.findByIdAndUpdate(categoriesExistedData?._id, { type, categories: categoryItems });
};

export default {
  findOne,
  createFaqLayout,
  createCategoriesLayout,
  createBannerLayout,
  updateBannerLayout,
  updateFaqLayout,
  updateCategoriesLayout,
};
