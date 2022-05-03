/* eslint-disable arrow-body-style */
import db from './models/index.mjs';

// BASE
if (process.argv[2] === 'create') {
  db.Trip.create({
    name: process.argv[3],
  })
    .then((result) => {
      console.log('created trip successfully');
      console.log(result);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

if (process.argv[2] === 'add-attrac') {
  // retrieve the trip specified
  const newAttraction = {};
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  })
    .then((returnedTrip) => {
      newAttraction.trip_id = returnedTrip.id;
      // add the attraction into the trip
      return db.Category.findOne({
        where: {
          name: process.argv[5],
        },
      });
    })
    .then((returnedCategory) => {
      return db.Attraction.create({
        name: process.argv[4],
        // used to add relation category relation into attraction
        category_id: returnedCategory.id,
        // used to add the trip relation into attraction
        trip_id: newAttraction.trip_id,
      });
    })
    .then((result) => {
      console.log('added attraction into trip successfully!');
      console.log(result);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

if (process.argv[2] === 'trip') {
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  })
    .then((returnedTrip) => {
      return db.Attraction.findAll({
        where: {
          trip_id: returnedTrip.id,
        },
      });
    })
    .then((result) => {
      console.log(`🌎 Trip ${process.argv[3]} has attractions from:`);
      const attractions = result.map((x, index) => {
        return `\n${index + 1}: ${x.name}`;
      });
      console.log(...attractions);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

if (process.argv[2] === 'add-category') {
  db.Category.create({
    name: process.argv[3],
  });
}

// COMFORTABLE
// get all attractions in 'trip' with given 'category'
if (process.argv[2] === 'category-trip') {
  const columnId = {};
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  }).then((returnedTrip) => {
    columnId.trip_id = returnedTrip.id;
    return db.Category.findOne({
      where: {
        name: process.argv[4],
      },
    }).then((returnedCategory) => {
      columnId.category_id = returnedCategory.id;
      return db.Attraction.findAll({
        where: {
          trip_id: columnId.trip_id,
          category_id: columnId.category_id,
        },
      }).then((returnedAttraction) => {
        const attractions = returnedAttraction.map((attraction, index) => {
          return `\n${index + 1}: ${attraction.name}`;
        });
        console.log(
          `Attractions that are in <Trip: ${process.argv[3]}> and under <Category: ${process.argv[4]}>:`
        );
        console.log(...attractions);
      });
    });
  });
}

// get attractions for all trips that belong to specific category
if (process.argv[2] === 'category-attractions') {
  db.Category.findOne({
    where: {
      name: process.argv[3],
    },
  }).then((returnedCategory) => {
    return db.Attraction.findAll({
      where: {
        category_id: returnedCategory.id,
      },
    }).then((returnedAttractions) => {
      let output = `Attractions from <Category: ${process.argv[3]}>:`;
      const attractionList = returnedAttractions.map((attractions, index) => {
        const attraction = `\n${index + 1}: ${attractions.name}`;
        output += attraction;
      });
      console.log(output);
    });
  });
}
