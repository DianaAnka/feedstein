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

  async deactivateUser(_id: string, token: string, tokenExpiresAt: Date) {
    const db = await getDB();
    const result = await db.collection<IUserSchema>('users').findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          active: false,
          activationToken: token,
          activationTokenExpirseAt: tokenExpiresAt,
        },
      },
      { returnDocument:'after' }
    );
    return result.value;
  }

  async resetPassword(token: string, password: string): Promise<boolean> {
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
          password,
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
