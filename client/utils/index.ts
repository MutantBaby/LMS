export function isUserExist(user: any): boolean {
  if (
    user === null ||
    user === undefined ||
    user === "" ||
    (Array.isArray(user) && user.length === 0)
  )
    return false;

  if (
    typeof user === "object" &&
    !Array.isArray(user) &&
    Object.keys(user).length === 0
  )
    return false;

  return true;
}

export const reviews = [
  {
    name: "John Doe",
    profession: "Web Developer",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    comment:
      "Lorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sitLorem ipsum dolor sitLorem ipsum dolor sitLorem ipsum dolor sits amet consectetur.",
  },
  {
    name: "Jane Smith",
    profession: "Graphic Designer",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    comment:
      "Ut enim ad minim veniam, quis nostrudUt enim ad minim veniam, quis nostrudUt enim ad minim veniam, quis nostrudUt enim ad minim veniam, quis nostrudUt enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    name: "Alice Johnson",
    profession: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    comment: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
  {
    name: "Bob Brown",
    profession: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    comment:
      "Excepteur sint occaecat cupidatat occaecat cupidatatoccaecat cupidatatoccaecat cupidatat non proident.",
  },
  {
    name: "Sarah Davis",
    profession: "Content Writer",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    comment:
      " Sed ut perspiciatis unde omnis iste natus error.Sed ut perspiciatis unde omnis iste natus error.Sed ut perspiciatis unde omnis iste natus error.Sed ut perspiciatis unde omnis iste natus error.Sed ut perspiciatis unde omnis iste natus error.",
  },
];
