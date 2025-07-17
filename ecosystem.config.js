module.exports = {
    apps : [
        {
            name: "portal",
            script: '.next/standalone/server.js',
            //script: 'node_modules/next/dist/bin/next',
            //args: 'start',
            mode: "cluster",
            instances: 4,
            max_memory_restart: '8G',            
            watch: false,
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
                HOSTNAME: "0.0.0.0",
                NODE_TLS_REJECT_UNAUTHORIZED: "0",
                SSL_VERIFY: "false"
            }
        }
    ]
}