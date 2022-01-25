'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.liked.find({ user_id: { $eq: ctx.request.header.user_id } });

    return sanitizeEntity(entity, { model: strapi.models.liked });
  },
  async findLikedArticles(ctx){
    const likeds = await strapi.services.liked.find({ 
      user_id: { $eq: ctx.request.header.user_id } 
    });
    const likeds_id = [];
    
    likeds.forEach(el =>{
      likeds_id.push(el.article_id)
    })
    
    const articles = await strapi.services.article.find({ 
      id: { $in: likeds_id } 
    });

    return sanitizeEntity(articles, { model: strapi.models.liked })
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [liked] = await strapi.services.liked.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!liked) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.liked.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.liked.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.liked });
  },
};
