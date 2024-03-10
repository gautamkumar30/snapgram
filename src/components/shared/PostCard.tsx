import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const creatorId = post.creator.$id;

  if (!post.creator) return;

  return (
    <div className="post-card flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <Link to={`/profile/${post.creator.$id}`}>
          <div className="flex gap-3">
            <img
              src={post?.creator?.imageUrl}
              className="rounded-full w-12 lg: h-12"
              alt=""
            />
          </div>
        </Link>
        <div className="flex-grow">
          <p>{post.creator.name}</p>
          <p className="text-light-3">
            {multiFormatDateString(post.$createdAt)} - {post.location}
          </p>
        </div>
        {user.id === creatorId && (
          <Link to={`/update-post/${post.$id}`}>Edit</Link>
        )}
      </div>
      <Link to={`/posts/${post.$id}`}>
        <p>{post.caption}</p>
        {post.tags.map((tag: string) => (
          <p className="text-light-3 opacity-90" key={post.$id}>
            #{tag}
          </p>
        ))}
      </Link>
      {/* <img src={post.imageUrl} alt="" /> */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
