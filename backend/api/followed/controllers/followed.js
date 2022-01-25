'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.followed.find({ user_id: { $eq: ctx.request.header.user_id } });

    return sanitizeEntity(entity, { model: strapi.models.followed });
  },
  async findFollowedsArticles(ctx){
    const followeds = await strapi.services.followed.find({ 
      user_id: { $eq: ctx.request.header.user_id } 
    });
    const followeds_ids = [];
    
    followeds.forEach(el =>{
      followeds_ids.push(el.author_id)
    })
    
    const authors = await strapi.plugins['users-permissions'].services.user.fetchAll({
      id: { $in: followeds_ids }
    });
    const authors_ids = [];

    authors.forEach(el =>{
      authors_ids.push(el.id)
    })

    const articles = await strapi.services.article.find({ author_id: { $in: authors_ids } });

    return sanitizeEntity(articles, { model: strapi.models.followed })
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
