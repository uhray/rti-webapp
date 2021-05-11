export function getDisplayName(user) {
  if (!user.contactInfo?.firstName) {
    return user.username;
  } else if (user.contactInfo?.firstName && !user.contactInfo?.lastName) {
    return user.contactInfo.firstName;
  } else {
    return user.contactInfo.firstName + ' ' + user.contactInfo.lastName;
  }
}
