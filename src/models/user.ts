import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  getConnection,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  discordId: string;

  @Column()
  username: string;

  @Column("integer")
  length: number;

  @Column()
  playtime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany((type) => Reminder, (reminder) => reminder.user, { eager: true })
  // reminders?: Reminder[];

  // addUser = async (message, length, playtime) => {
  //   try {
  //     const con = getConnection();
  //     let user = new User();
  //     user.discordId = message.author.id;
  //     user.username = message.author.username;
  //     user.length = length;
  //     user.playtime = playtime;

  //     let repository = con.getRepository(User);
  //     const userExist = await repository.findOne({
  //       discordId: message.author.id,
  //     });

  //     if (!userExist) {
  //       const saved = await repository.save(user);
  //       console.log(
  //         "[BerdBot] - User has been saved: " + saved.username,
  //         "lightblue",
  //       );
  //     }
  //   } catch (error) {
  //     console.log("[BerdBot] - " + error.message, "red");
  //   }
  // };

  // getUser = async (message) => {
  //   try {
  //     const con = getConnection();
  //     let repository = con.getRepository(User);
  //     const user = await repository.findOne({
  //       discordId: message.author.id,
  //     });

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     console.log("[BerdBot] - Found User: " + user.username, "lightblue");
  //   } catch (error) {
  //     console.log("[BerdBot] - " + error.message, "red");
  //   }
  // };

  // deleteUser = async (message) => {
  //   try {
  //     const con = getConnection();
  //     let repository = con.getRepository(User);
  //     const user = await repository.findOne({
  //       discordId: message.author.id,
  //     });

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     await repository.delete({ id: user.id });
  //     console.log("[BerdBot] - Deleted User: " + user.username, "lightblue");
  //   } catch (error) {
  //     console.log("[BerdBot] - " + error.message, "red");
  //   }
  // };

  // updateUser = async (message, newUserData) => {
  //   try {
  //     const con = getConnection();
  //     let repository = con.getRepository(User);
  //     const user = await repository.findOne({
  //       discordId: message.author.id,
  //     });

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     await repository.update({ discordId: user.discordId }, newUserData);
  //     console.log("[BerdBot] - Updated User: " + user.username, "lightblue");
  //   } catch (error) {
  //     console.log("[BerdBot] - " + error.message, "red");
  //   }
  // };
}
