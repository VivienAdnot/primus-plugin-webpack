import moment from 'moment';

const greet = () => {
    const dayOfWeek = moment().format('dddd');
    console.log(`Have a great ${dayOfWeek} !`);
};

export default greet;