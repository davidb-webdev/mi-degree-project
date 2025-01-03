module.exports = {
  apps : [
      {
        name: "backend",
        script: "ts-node -T server.ts",
        env: {
          "SERVER_PORT": 5000,
          "DB_URL": "mongodb://admin:6b28f3460c000ce63754038df8b35f78ccd37da3705138b9@127.0.0.1:27017",
          "DB_NAME": "exjobb",
          "COOKIESESSION_SECRET": "fwjJwgvkiIwrf8Gw9!hDq4Sv&q2wq9uF2",
          "NODE_ENV": "production"
        }
      }
  ]
}