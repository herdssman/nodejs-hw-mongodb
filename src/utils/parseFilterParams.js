const parseType = (type) => {
  if (typeof type === 'undefined') return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavourite = (bool) => {
  if (bool === 'true') return true;
  if (bool === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return { type: parsedType, isFavourite: parsedIsFavourite };
};
