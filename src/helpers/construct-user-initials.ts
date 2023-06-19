import { IUser } from "../../types";

export default function constructUserInitials(user: Partial<IUser>): string {
  const { lastname, firstname, email } = user;

  if (lastname && firstname) {
    return `${firstname.charAt(0).toUpperCase()}${lastname
      .charAt(0)
      .toUpperCase()}`;
  }

  if (firstname) {
    return firstname.substring(0, 2).toUpperCase();
  }

  if (lastname) {
    return lastname.substring(0, 2).toUpperCase();
  }

  return email!.substring(0, 2).toUpperCase();
}
