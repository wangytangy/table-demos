import _ from 'lodash';

export function aggregateWalmartItems({searchResults = [], path = ''} = {}) {
  if (_.isEmpty(searchResults)) return [];

  return searchResults.reduce((accum, currentResult) => {
    const itemsList = _.get(currentResult, path, []);
    return accum.concat(itemsList);
  }, []);
}
