import {
  Column,
  Entity,
  getConnection,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { log } from "../../utils";
import { User } from "./user";
import * as moment from "moment";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @Column()
  time: Date;

  @ManyToOne((type) => User, (user) => user.reminders)
  user: User;

  @Column()
  @RelationId((reminder: Reminder) => reminder.user)
  userId: number;

  @Column()
  offset: number;
}

export const getAllReminders = async () => {
  try {
    const con = getConnection();

    let repository = con.getRepository(Reminder);
    const reminders = await repository.find();

    return reminders;
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const addReminder = async (discordBot, message, args) => {
  try {
    // Database connection declaration as well as the repositories needed
    const con = getConnection();
    let userRepository = con.getRepository(User);

    // Initial reminder argument parsing (To seperate message and time)
    let reminderMsg = args.join(" ");
    const timeStart = reminderMsg.indexOf("--time:") + 7;
    let reminderTime = reminderMsg.slice(timeStart, reminderMsg.length);
    const offset = moment.parseZone(message.createdAt).utcOffset();
    console.log("CREATED AT: ", message.createdAt);
    // Checks if the Discord user has data within the online database
    let userExist = await userRepository.findOne({
      discordId: message.author.id,
    });
    let repository = con.getRepository(Reminder);

    if (!userExist) {
      // Create User and allow access
    }

    let reminder = new Reminder();
    reminderMsg = reminderMsg.slice(0, timeStart - 7);
    reminder.message = reminderMsg;
    reminder.time = moment(reminderTime, "DD-MM-YYYY HH:mm")
      .utc(false)
      .utcOffset(offset === 0 ? 480 : 480, false)
      .toDate();
    reminder.userId = userExist.id;
    reminder.user = userExist;
    reminder.offset = offset;
    const saved = await repository.save(reminder);

    log("[BerdBot] - Reminder has been saved for: " + saved.time, "lightblue");
    discordBot.users.fetch(`${userExist.discordId}`).then(async (user) => {
      await user.send("> `Reminder has been saved for: " + saved.time + "`");
    });
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};
