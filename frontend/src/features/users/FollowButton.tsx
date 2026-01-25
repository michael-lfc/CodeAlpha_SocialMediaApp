import { useState } from "react";
import { toggleFollow } from "../../api/user.api";
import type { User } from "../../types/user.types";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  targetUser: User;
};

const FollowButton = ({ targetUser }: Props) => {
  const { user } = useAuth();

  const [isFollowing, setIsFollowing] = useState(
    targetUser.followers.some((f) => f._id === user!._id)
  );

  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await toggleFollow(targetUser._id);
      setIsFollowing((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollow} disabled={loading}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
