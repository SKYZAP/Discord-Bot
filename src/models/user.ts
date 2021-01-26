import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  getConnection,
  OneToMany,
} from "typeorm";
import { log } from "../../utils";
import { Reminder } from "./reminder";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discordId: string;

  @Column()
  username: string;

  @Column("integer")
  length: number;

  @Column()
  playtime: number;

  @OneToMany((type) => Reminder, (reminder) => reminder.user, { eager: true })
  reminders?: Reminder[];
}

export const addUser = async (message, length, playtime) => {
  try {
    const con = getConnection();
    let user = new User();
    user.discordId = message.author.id;
    user.username = message.author.username;
    user.length = length;
    user.playtime = playtime;

    let repository = con.getRepository(User);
    const userExist = await repository.findOne({
      discordId: message.author.id,
    });

    if (!userExist) {
      const saved = await repository.save(user);
      log("[BerdBot] - User has been saved: " + saved.username, "lightblue");
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const getUser = async (message) => {
  try {
    const con = getConnection();
    let repository = con.getRepository(User);
    const user = await repository.findOne({
      discordId: message.author.id,
    });

    if (!user) {
      throw new Error("User not found");
    }

    log("[BerdBot] - Found User: " + user.username, "lightblue");
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const deleteUser = async (message) => {
  try {
    const con = getConnection();
    let repository = con.getRepository(User);
    const user = await repository.findOne({
      discordId: message.author.id,
    });

    if (!user) {
      throw new Error("User not found");
    }

    await repository.delete({ id: user.id });
    log("[BerdBot] - Deleted User: " + user.username, "lightblue");
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const updateUser = async (message, newUserData) => {
  try {
    const con = getConnection();
    let repository = con.getRepository(User);
    const user = await repository.findOne({
      discordId: message.author.id,
    });

    if (!user) {
      throw new Error("User not found");
    }

    await repository.update({ discordId: user.discordId }, newUserData);
    log("[BerdBot] - Updated User: " + user.username, "lightblue");
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};
