'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author_id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
