import db from './models/index.mjs';

const createItemInCategory = async () => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: process.argv[2],
      },
    });
    const item = await category.createItem({
      name: process.argv[3],
    });
  } catch (err) {
    console.log('error: ', err);
  }
};

createItemInCategory();
