import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Jetracer } from "./jetracer";

@Entity()
export class Media {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Jetracer, (jetracer) => jetracer.medias)
  jetracer: Jetracer;

  @Column()
  @RelationId((media: Media) => media.jetracer)
  jetracerId: number;

  @Column()
  url: string;
}
