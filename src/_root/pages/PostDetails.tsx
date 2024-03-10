import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <div className="animate-pulse">Loading Post Data</div>
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} width={300}></img>
          <div className="flex gap-3 items-center post_details-info">
            <Link to={`/profile/${post?.creator.$id}`}>
              <div className="flex gap-3">
                <img
                  src={post?.creator?.imageUrl}
                  className="rounded-full w-12 lg: h-12"
                  alt=""
                />
              </div>
            </Link>
            <div className="flex-grow">
              <p>{post?.creator.name}</p>
              <p className="text-light-3">
                {multiFormatDateString(post?.$createdAt)} - {post?.location}
              </p>
            </div>
            {user.id === post?.creator.$id && (
              <Link to={`/update-post/${post?.$id}`}>Edit</Link>
            )}
          </div>
          <Link to={`/posts/${post?.$id}`}>
            <p>{post?.caption}</p>
            {post?.tags.map((tag: string) => (
              <p className="text-light-3 opacity-90" key={post.$id}>
                #{tag}
              </p>
            ))}
          </Link>
          <button onClick={handleDeletePost}>Delete Post</button>
          <div>
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
