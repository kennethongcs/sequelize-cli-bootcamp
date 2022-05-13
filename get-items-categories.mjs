import db from './models/index.mjs';

const getItemsCategories = async () => {
  try {
    const item = await db.Item.findOne({
      where: {
        name: process.argv[2],
      },
    });
    const itemCategories = await item.getCategories();
    console.log(itemCategories.map((category) => category.name));
  } catch (err) {
    console.log('error: ', err);
  }
};

getItemsCategories();
