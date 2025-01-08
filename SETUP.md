# Setup
```bash
$ npm i nest -g

# create your new project
$ sudo next new my-project

# Go to the new project's folder
$ cd my-project

# Once un the editor, open the terminal and run the next command to grant you the ownership of the project to conturn the Sudo problem
$ sudo chown -R $USER .
```

# cheat sheet DB
```bash
$ npm i prisma
$ npx prisma init --datasource-provider postgresql

# create postgres SERVER in docker container
# /!\ set a custom port to avoid connexion problem => 5433:5432
# the default port has to be set in second position
$ docker run --name postgres-test -e POSTGRES_PASSWORD=postgres -d -p 5433:5432 postgres

# create testdb on server
$ docker exec -it postgres-test psql -U postgres -c 'CREATE DATABASE testdb;'

# see pid of running port 5432
$ sudo lsof -i :5432
$ sudo kill [pid]

# migrate new version of the db
$ npx prisma migrate dev --name init

# install the prisma client
$ npm i @prisma/client

# (re)generate the client
$ npx prisma generate
```

# Add Quality of life to your development
## Allow Hot Module Replacement
```bash
$ npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
```

### Configuration
Once the installation is complete, create a `webpack-hmr.config.js` file in the root directory of your application.

```js

const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
```

### Hot-Module Replacement
To enable HMR, open the application entry file (main.ts) and add the following webpack-related instructions:
```ts
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```
Now simply open your command line and run the following command:

```bash
$ npm run start:dev
```
To simplify the execution process, add a script to your package.json file.

```json
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
```




## Add the environment variable configuration to set a custom port
You will need the configuration module and inject the module.
```bash
$ npm i --save @nestjs/config
```

Generate a new module
```bash
$ next g module config/config
```
Then, add this code
```ts
// config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as Config} from '@nestjs/config';

@Module({imports:[Config.forRoot()]})
export class ConfigModule {}
```
Modify the AppModule class so it uses the config from your future .env file
```ts
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule,...],
  controllers: [AppController],
  providers: [...],
})
export class AppModule {}
```
Now, you can set your custom PORT in a .env file placed at the root of the project
```json
PORT = 8080
```