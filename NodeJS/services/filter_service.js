const { User } = require('../DataBase');


const filterUsers = async (query) => {
  const { limit, page, ...otherFilters } = query;
  const skip = (page - 1) * limit;

  let filterObj = {};

  if (otherFilters.search) {
    filterObj = {
      ...filterObj,
      $or: [
        { name: { $regex: otherFilters.search, $options: 'i' } },
        { email: { $regex: otherFilters.search, $options: 'i' } }
      ]
    }
  }

  if (otherFilters.age_gte) {
    filterObj = {
      ...filterObj,
      // + робить зі стрінги число
      age: { $gte: +otherFilters.age_gte }
    }
  }

  if (otherFilters.age_lte) {
    filterObj = {
      ...filterObj,
      // + робить зі стрінги число
      age: Object.assign(filterObj.age || {}, { $lte: otherFilters.age_lte })
    }
  }

  const users = await User.find(filterObj).limit(limit).skip(skip)
  const countUsers = await User.count(filterObj);


  return {
    page,
    limit,
    data: users,
    countUsers
  };
}


module.exports = {
  filterUsers
};
