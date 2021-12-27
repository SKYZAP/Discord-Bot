# Get Started with Berd-Bot
## **1. Introduction**

You can start by cloning the bot repository by using the commands below:
```
git clone https://github.com/SKYZAP/Discord-Bot.git
```
and the bot can be started by running:
```
npm start
```

## **2. File Structure**
```
Discord-Bot
├── old-botfiles            # V12 discord-bot files (will be removed after refactor complete)
├── src                     # Source files
│   ├── commands            # Command files (for bot functionality)
│   ├── utils               # Utility files (globally used functions)
│   ├── models              # Database model files (for typeorm postgres)
│   └── app.ts   
├── Procfile                # Heroku config file
├── ffmpeg.exe              # Audio package file
├── tsconfig.json           # TypeScript config file
└── tslint.json             # Typescript linting config file
```
## **3. Environments**
### Development
When the bot script is started, the commands created locally would be registered to the test guild which is the Berd Room Server. The repository was set up to automatically deploy commands to the test server when running the script locally so testing can be done easier.
### Production
When the main branch is updated, Heroku would automatically deploy the new build and in doing so, it will globally register all the commands contained within the bot so no special set up is needed for the production environment
## **4. Command Creation**
- **1. Create a new file with the command as the filename in the commands folder (E.G ping.ts)**
- **2. Follow the discord.js command format as follows:**
```
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()              # Slash command data declaration which includes description, options and name
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {                 # Async function containing the command logic
    await interaction.reply(`Ping`);
  },
};

```
- **3. Run the start script and test out the newly created command in the test server (Berd Room). Locally registered commands will have their descriptions prefixed with [DEV]-. Local commands would also update instantly on Discord whenever the script is changed and the bot is restarted**
## **5. Database Interaction**
This project utilizes a PostgreSQL database and interactions with it can be done as follows:

**1. Create a new file in the models folder (E.G player.ts for a Player table) with the follow format:**
```
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}

```

**2. Generate the database migration with:**
```
npm run mig:gen migrationName            # migrationName can be init-tableName or update-tableName
```
**3. Run the pending migrations with:**
```
npm run mig:run                          # Runs the latest created migration
```
**4. The new tables can be utilized by getting the DB connection as follows:**
```
import { getConnection } from "typeorm";
import { Player } from "./player"

con = getConnection()                    # Gets typeorm database connection
playerRepo = con.getRepository(Player)   # Obtains Player repository from the connection
```
**5. Database operations can be done as follows:**
- **CREATE**
```
await playerRepo.save({
  name: "Bob",
  status: "Bored"
})
```
- **READ**
```
await playerRepo.findOne({
  id: UUID
})
```
- **UPDATE**
```
await playerRepo.update({
  name: "Bobo",
  id: UUID
})
```

- **DELETE**
```
await playerRepo.delete({
  id: UUID
})
```
Additional documentation can be found at: [TypeORM](https://typeorm.io/#/)

