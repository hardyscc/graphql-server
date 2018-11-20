import * as argon from 'argon2';
import { MutationResolvers } from '../../../types';
import { User } from '../../../entity/User';

const resolvers: MutationResolvers.Resolvers = {
  register: async (_, { input: { username, email, password } }) => {
    const hashedPassword = await argon.hash(password);

    await User.create({
      username,
      email,
      password: hashedPassword
    }).save();

    return { errors: [] };
  }
};

export default { Mutation: resolvers };
