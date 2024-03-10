import { useParams } from "react-router-dom";
import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";

const EditPost = () => {
  const { id } = useParams();
  // console.log(id);

  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) return <p className="animate-pulse">Loading Post Details</p>;

  return (
    <div>
      <div className="h3-bold">Edit Post</div>
      <PostForm action="Update" post={post} />
    </div>
  );
};

export default EditPost;
