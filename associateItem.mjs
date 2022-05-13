import db from './models/index.mjs';

const createAssoc = async () => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: process.argv[2],
      },
    });
    const item = await db.Item.findOne({
      where: {
        name: process.argv[3],
      },
    });
    // add an association of 'fish' to 'peach' in the join table
    const result = await category.addItem(item);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
};

createAssoc();
