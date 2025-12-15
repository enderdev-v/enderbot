# Installation


> [!Important]
> Ya tienes que haber clonado el repositorio a tu maquina para que sigas los pasos asi que primero clonalo y vuelve aca

### ***Instalas los paquetes*** 📦

```bash
# Using npm

npm install

# Using pnpm

pnpm install

# Using yarn

yarn install

# Using Bun

Bun install
```

> Actually in my case I use pnpm but you can use other

### Env File 📁

Copias el archivo [env.example](/.env.example) ese archivo te da una guia de lo que tienes que colocar colocalo asi como esta el archivo con los datos que te pide

### Database ☕

enderbot usa mongodb pero para manejarlo se usa Prisma 

> [!NOTE]
> Si no sabes como usar Prisma puedes ver la [documentacion](https://www.prisma.io/docs/getting-started) de Prisma para que puedas aprender a usarlo

Despues de que hayas configurado tu base de datos y tengas el archivo .env listo puedes correr el siguiente comando para que se creen las tablas en la base de datos

```bash
# Using npm
npm run prisma:generate
# Using pnpm   
pnpm prisma:generate
# Using yarn
yarn prisma:generate
# Using Bun
Bun run prisma:generate
```

### Start the bot 🤖

Ahora si ya tienes todo listo puedes correr el bot con el siguiente comando

```bash
# Using npm
npm run start
# Using pnpm
pnpm start
# Using yarn
yarn start
# Using Bun
Bun run start
```
> [!NOTE]
> Si quieres correr el bot en modo desarrollo puedes usar el comando `dev` en vez de `start` para que puedas ver los cambios en tiempo real


### Command Botstats

Este comando da como un resumen de las principales librerias que usa su version y si algo del rendimiento para acceder a este nomas vas al archivo de [Config.ts](/src/structures/classes/enderbot/Config.ts)
```ts
devsId = [
		'780277567537414165', // Este es enderdev-v no lo borres
        "" // <-- Aqui agregas tu id Para probarlo nomas no se deja en en commit :D
	];
```


> Create by enderdev / enderdev-v