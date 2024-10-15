import { Worker } from 'node:worker_threads';
import { resolve } from 'node:path';
import { getDirname } from '../utils/determinePath.js';
import { cpus } from 'node:os';




const performCalculations = async () => {
    const workersArr = [];
    try {
        for(let coreUnit = 0; coreUnit < cpus().length; coreUnit += 1) {
            const promisedWorker = new Promise((res, rej) => {
                const worker = new Worker(resolve(getDirname(import.meta.url), 'worker.js'), { workerData: coreUnit + 10 });

                worker.on('message', (data) => {
                    const completedWorker = {
                        status: 'resolved',
                        data
                    };
                    res(completedWorker);
                });

                worker.on('error', () => {
                    const rejectedWorker = {
                        status: 'error',
                        data: null
                    };
                    rej(rejectedWorker);
                });
            })

            workersArr.push(promisedWorker);
        }

        const resultOfWorkers = await Promise.allSettled(workersArr);
        const formatedResult = resultOfWorkers.reduce((acc, el) => {
            if(el.status === 'fulfilled') acc.push(el.value.data);
            else acc.push(el.reason);
            return acc;
        }, []);
        console.log(formatedResult);

    } catch(err) {
        throw new Error(err.message);
    }
};

await performCalculations();