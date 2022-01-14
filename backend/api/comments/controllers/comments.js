'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.comments.find();
    const comments = [];
    const isArticleExist = strapi.services.article.find()

    entity.forEach(comment =>{
      if(comment.article_id === ctx.request.header.article_id){
        comments.push(comment);
      }
    })

    return sanitizeEntity(comments, { model: strapi.models.comments });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [comment] = await strapi.services.comments.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!comment) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comments.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comments.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comments });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [comment] = await strapi.services.comments.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!comment) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comments.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comments.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comments });
  },
};
