module.exports = {
    apps : [
        {
            name: "portal",
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            mode: "cluster",
            instances: 8,
            max_memory_restart: '1G',            
            watch: true,
            ignore_watch: ["node_modules"],
            autorestart: true,
            env_development: {
                PORT: 3000,
                NEXTAUTH_SECRET: "",
                NODE_ENV: "development"
            },
            env_production: {
                PORT: 3000,
                NEXTAUTH_SECRET: "",
                NODE_ENV: "production",
            }
        }
    ]
}