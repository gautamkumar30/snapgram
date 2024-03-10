import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div>
      <div className="h3-bold">Create Post</div>
      <PostForm action="Create" />
    </div>
  );
};

export default CreatePost;
