module.exports = {
    apps : [
        {
            name: "portal",
            mode: "cluster",
            instances: 4,
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            watch: true,
            env_development: {
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 3000,
                "NODE_ENV": "production",
            }
        }
    ]
}