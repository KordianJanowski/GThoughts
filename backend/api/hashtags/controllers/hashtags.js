const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {

    let entities;

    entities = await strapi.services.hashtags.find(ctx.query);

    const countedHashtagsObject = {};
      entities.forEach((x) => {
        countedHashtagsObject[x.name] = (countedHashtagsObject[x.name] || 0) + 1;
      });

    const countedHashtagsArray = [];
    Object.keys(countedHashtagsObject).forEach(key => {
      countedHashtagsArray.push(
        {
          name: key,
          counter: countedHashtagsObject[key]
        }
      )
    });

    return sanitizeEntity(countedHashtagsArray, { model: strapi.models.hashtags });
  },
};