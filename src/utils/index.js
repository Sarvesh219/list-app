import _ from 'lodash';

export default function findStringInArrayOfObject(
    collection,
    properties,
    searchString
) {
    return _.filter(collection, element => {
        for (const key of properties) {
            if(
                _.get(element, key) &&
                _.includes(
                    _.get(element, key)
                        .toString()
                        .toLowerCase(),
                    searchString.toString().toLowerCase()
                )
            ) {
                return true;
            }
        }
        return false;
    });
}