import _ from 'lodash';

export function aggregateWalmartItems({searchResults = [], path = ''} = {}) {
  if (_.isEmpty(searchResults)) return [];

  return searchResults.reduce((accum, currentResult) => {
    const itemsList = _.get(currentResult, path, []);
    return accum.concat(itemsList);
  }, []);
}

export function sanitizeWalmartItems(items = []) {
  return items.map((item) => {
    return _.pick(item, [
      'categoryPath',
      'customerRating',
      'customerRatingImage',
      'itemId',
      'name',
      'numReviews',
      'productUrl',
      'salePrice',
      'shortDescription',
      'thumbnailImage',
      'msrp'
    ])
  });
}
