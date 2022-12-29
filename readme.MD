### npm init -y

- create .seqluelizerc ( Copy below code )

```
const path = require('path')

module.exports = {
  config: path.resolve('./config', 'config.js'),
  'models-path': path.resolve('./models'),
  'seeders-path': path.resolve('./seeders'),
  'migrations-path': path.resolve('./migrations'),
}

```

#### npm i express nodemon sequelize sequelize-cli mysql mysql2 cors

#### npx sequelize-cli init

# 2

#### npx sequelize-cli model:generate --name User --attributes firstName:string

#### sequelize db:migrate

#### npx sequelize-cli db:migrate
