
const parseEnv = () => {
    const result = [];
    for(let key in process.env) {
        if(key.startsWith('RSS_')) {
            const currentEnv = `${key}=${process.env[key]}`
            result.push(currentEnv)
        }
    }
    console.log(result.join('; '))
};

parseEnv();