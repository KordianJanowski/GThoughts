'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.comments.find( { article_id: ctx.request.header.article_id } );

    // Sort comments by newest
  let comments = entity.sort((comment1, comment2) => +new Date(comment2.createdAt) - +new Date(comment1.createdAt))

    comments = comments.slice(0, ctx.request.header.page * 10)

    const data = {
      comments,
      "allCommentsNumber": entity.length
    }

    return sanitizeEntity(data, { model: strapi.models.comments });
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
