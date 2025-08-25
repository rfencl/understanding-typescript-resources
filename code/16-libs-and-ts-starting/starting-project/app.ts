import _ from 'lodash'
const numbers = [1, 2, 3, 4, 5];

_.chunk(numbers, 2).forEach(chunk => {
    console.log(chunk);
}
);