'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.followed.find();
    const followeds = [];
    entity.forEach(followed =>{
      if(followed.user_id === ctx.request.header.user_id){
        followeds.push(followed);
      }
    })

    return sanitizeEntity(followeds, { model: strapi.models.followed });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [followed] = await strapi.services.followed.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!followed) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.followed.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.followed.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.followed });
  },
};
