import { normalize, denormalize, schema } from 'normalizr';

const normalizeChatMessage = (dataUnormalize) => {
  const user = new schema.Entity('users');
  const messages = new schema.Entity('mensajesUsuarios', {
    author: user,
  });

  const globalMessage = new schema.Entity('messageContainer', {
    messagesUsers: [messages],
  });
  const normalizedData = normalize(dataUnormalize, globalMessage);
  return normalizedData;
};

const denormalizeChatMessage = (dataNormalized) => {
  const user = new schema.Entity('users');
  const messages = new schema.Entity('mensajesUsuarios', {
    author: user,
  });

  const globalMessage = new schema.Entity('messageContainer', {
    messagesUsers: [messages],
  });

  const denormalizedData = denormalize(
    dataNormalized.result,
    globalMessage,
    dataNormalized.entities
  );

  return denormalizedData.messages;
};

export { normalizeChatMessage, denormalizeChatMessage };
