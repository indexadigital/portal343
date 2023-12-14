module.exports = {
    apps : [
        {
            name: "portal343",
            mode: "cluster",
            script: "./server.js",
            watch: true,
            env_development: {
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 8000,
                "NODE_ENV": "production",
            }
        }
    ]
}