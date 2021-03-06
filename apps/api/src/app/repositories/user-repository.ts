import {
  InserUserDTO,
  IUserRepository,
  IUserSchema,
} from '@feedstein/api-interfaces';
import * as moment from 'moment';
import { getDB } from '../infra/db';

export class UserRepository implements IUserRepository {
  async insert(data: InserUserDTO): Promise<IUserSchema> {
    const db = await getDB();
    const result = db.collection('users').insertOne(data);
    return {
      _id: (await result).insertedId.toString(),
      ...data,
    };
  }

  async findByEmail(email: string): Promise<IUserSchema> {
    const db = await getDB();
    return db.collection<IUserSchema>('users').findOne({ email });
  }

  async activateUserByToken(token: string): Promise<boolean> {
    const db = await getDB();
    const result = await db.collection<IUserSchema>('users').updateOne(
      {
        active: { $ne: true },
        activationToken: token,
        activationTokenExpirseAt: {
          $gt: moment().toDate(),
        },
      },
      {
        $set: {
          active: true,
        },
        $unset: {
          activationToken: true,
          activationTokenExpirseAt: true,
        },
      }
    );
    return result.modifiedCount > 0;
  }
}

export default new UserRepository();
