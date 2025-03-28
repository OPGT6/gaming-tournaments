import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51R7QYGCYV9AhCec1FuZbZva50C5MFHVGNxTU50nPuYjc1e9cqe7laKkHe56Dl7tYJ1nSF1WM1k6ixsZZB5Z7ZazQ00dZvpNX5P');

export const getStripe = () => stripePromise;