const parseArgs = () => {
    const result = [];
    for(let arg = 2; arg < process.argv.length; arg += 2) {
        if(process.argv[arg].startsWith('--') && process.argv[arg + 1]) {
            const currentArg = `${process.argv[arg].slice(2)} is ${process.argv[arg + 1]}`;
            result.push(currentArg);
        }
    }
    console.log(result.join(', '))
};

parseArgs();
