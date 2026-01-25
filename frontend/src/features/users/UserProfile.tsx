import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserProfile,
  getMyProfile,
  toggleFollow,
  updateProfileImage,
} from "../../api/user.api";
import type { User } from "../../types/user.types";

type Props = {
  userId?: string;
};

const UserProfile = ({ userId }: Props) => {
  const { user: loggedInUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const isOwnProfile = !userId || userId === loggedInUser?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = userId ? await getUserProfile(userId) : await getMyProfile();
        setProfile(user);

        if (loggedInUser && userId) {
          const following = loggedInUser.following ?? [];
          const isFollowing = following.some((u) => u._id === userId);
          setIsFollowing(isFollowing);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, loggedInUser]);

  const handleFollow = async () => {
    if (!profile || !loggedInUser) return;

    await toggleFollow(profile._id);

    setIsFollowing((prev) => !prev);

    setProfile((prev) => {
      if (!prev) return prev;

      const updatedFollowers = isFollowing
        ? prev.followers.filter((u) => u._id !== loggedInUser._id)
        : [...prev.followers, loggedInUser];

      return { ...prev, followers: updatedFollowers };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const updatedUser = await updateProfileImage(formData);
    setProfile(updatedUser);
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="profile-container">
      <img
        src={profile.profileImage?.url || "/default-avatar.png"}
        alt="Profile"
        className="profile-image"
      />

      {isOwnProfile && (
        <div>
          <input type="file" onChange={handleImageUpload} />
        </div>
      )}

      <h2>{profile.username}</h2>
      <p>{profile.email}</p>

      <div className="follow-stats">
        <button type="button" onClick={() => setShowFollowersModal(true)}>
          Followers: {profile.followers.length}
        </button>

        <button type="button" onClick={() => setShowFollowingModal(true)}>
          Following: {profile.following.length}
        </button>
      </div>

      {!isOwnProfile && (
        <button type="button" onClick={handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Followers</h3>
            <button type="button" onClick={() => setShowFollowersModal(false)}>
              Close
            </button>
            <ul>
              {profile.followers.map((u) => (
                <li key={u._id}>{u.username}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Following</h3>
            <button type="button" onClick={() => setShowFollowingModal(false)}>
              Close
            </button>
            <ul>
              {profile.following.map((u) => (
                <li key={u._id}>{u.username}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
