import { parentPort, workerData as n } from 'node:worker_threads';


const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    try {
        parentPort.postMessage({ status: 'resolved', data: nthFibonacci(n) });
    } catch(err) {
        throw new Error(err.message);
    }
};

sendResult();