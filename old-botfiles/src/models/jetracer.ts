import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media";

@Entity()
export class Jetracer {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  ipAddress: string;

  @Column()
  macAddress: string;

  @OneToMany(() => Media, (media) => media.jetracer, { eager: true })
  medias?: Media[];
}
