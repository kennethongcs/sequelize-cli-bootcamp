import db from './models/index.mjs';

const getCategoryItems = async () => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: process.argv[2],
      },
    });
    const categoryItems = await category.getItems();
    console.log(categoryItems.map((item) => item.name));
  } catch (err) {
    console.log('error: ', err);
  }
};

getCategoryItems();
