const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {

    let entities = await strapi.services.hashtags.find(ctx.query);
    let data = [];

    if(ctx.request.header.data_type === 'array') {
      entities.forEach(hashtag => {
        data.push(hashtag.name)
      })
    }
    else {
      const countedHashtagsObject = {};
      entities.forEach((x) => {
        countedHashtagsObject[x.name] = (countedHashtagsObject[x.name] || 0) + 1;
      });

      Object.keys(countedHashtagsObject).forEach(key => {
        data.push(
          {
            name: key,
            counter: countedHashtagsObject[key]
          }
        )
      });
    }

    return sanitizeEntity(data, { model: strapi.models.hashtags });
  },
};