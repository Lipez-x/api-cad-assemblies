import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Position {
  @Prop()
  position: string;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
}
