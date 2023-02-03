module.exports = {
    apps: [
        {
            name: 'cat',
            script: 'npm',
	    args: 'start',
            instances: 1,
            out_file: 'logs/out.log',
            error_file: 'logs/err.log'
        }
    ]
};
