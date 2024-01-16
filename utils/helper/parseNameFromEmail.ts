const parseNameFromEmail = (email?: string) => {
  return email?.split('@')[0];
};

export default parseNameFromEmail;
