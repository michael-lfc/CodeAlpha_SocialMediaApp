export interface UserPreview {
  _id: string;
  username: string;
  profileImage?: {
    url: string;
    public_id: string;
  };
}

// export interface User {
//   _id: string;
//   username: string;
//   email: string;
//   profileImage?: {
//     url: string;
//     public_id: string;
//   };
//   followers: User[];   // 👈 changed
//   following: User[];   // 👈 changed
//   createdAt: string;
// }

export interface UserPreview {
  _id: string;
  username: string;
  profileImage?: {
    url: string;
    public_id: string;
  };
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profileImage?: {
    url: string;
    public_id: string;
  };
  followers: UserPreview[];
  following: UserPreview[];
  createdAt: string;
}
